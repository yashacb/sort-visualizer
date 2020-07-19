class MergeSorter {
    constructor(array, func, stepDelay) {
        this.array = array;
        this.func =  func;
        this.stepDelay = stepDelay;
        this.generator = this.partialSort(0, array.length - 1);
    }

    * partialSort(l, h) {
        let mid = (l + h) >> 1;
        if (l < mid) {
            let leftGen = this.partialSort(l, mid);
            while(!leftGen.next().done) yield;
        }
        if (mid + 1 < h) {
            let rightGen = this.partialSort(mid + 1, h);
            while(!rightGen.next().done) yield;
        }

        let helper = Array(this.size).fill(0);
        this.func(this.array, helper);
        let i = l, j = mid + 1, k = l;
        while(i <= mid && j <= h) {
            if (this.array[i] <= this.array[j]) {
                helper[k++] = this.array[i++];
                this.func(this.array, helper); yield;
            }
            else {
                helper[k++] = this.array[j++];
                this.func(this.array, helper); yield;
            }
        }

        while(i <= mid) {
            helper[k++] = this.array[i++];
            this.func(this.array, helper); yield;
        }
        while(j <= h) {
            helper[k++] = this.array[j++];
            this.func(this.array, helper); yield;
        }

        for(let i = l; i <= h; i++) {
            this.array[i] = helper[i]; 
        }
        this.func(this.array, helper);
    }

    sort() {
        let isSorted = this.generator.next();
        if (!isSorted.done) {
            setTimeout(() => this.sort(), this.stepDelay);
        }
        else {
            this.func(this.array, Array(0));
        }
    }
}

export default MergeSorter;