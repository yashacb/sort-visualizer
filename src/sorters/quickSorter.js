class QuicknSorter {
    constructor(array, func, stepDelay) {
        this.array = array;
        this.func =  func;
        this.stepDelay = stepDelay;
        this.generator = this.partialSort(0, this.array.length - 1);
    }

    swap(i, j) {
        if (i == j) return false;
        
        let temp = this.array[i];
        this.array[i] = this.array[j];
        this.array[j] = temp;
        this.func(this.array);
        return true;
    }

    * partialSort(l, h) {
        let less = l - 1, pivot = this.array[h];
        let ix = l;

        while(ix < h) {
            if (this.array[ix] <= pivot) {
                less++;
                if(this.swap(ix, less)) yield;
            }
            ix++;
        }
        if(this.swap(less + 1, h)) yield;

        let pivotIx = less + 1;
        
        if (l < pivotIx - 1) {
            let leftGen = this.partialSort(l, pivotIx - 1);
            while(!leftGen.next().done) yield;
        }
        if (pivotIx + 1 < h) {
            let rightGen = this.partialSort(pivotIx + 1, h);
            while(!rightGen.next().done) yield;
        }
    }

    sort() {
        let isSorted = this.generator.next();
        if (!isSorted.done) {
            setTimeout(() => this.sort(), this.stepDelay);
        }
    }
}

export default QuicknSorter;