class InsertionSorter {
    constructor(array, func, stepDelay) {
        this.array = array;
        this.func =  func;
        this.stepDelay = stepDelay;
        this.generator = this.partialSort();
    }

    * partialSort() {
        for(let i = 0; i < this.array.length; i++) {
            let j = i;
            while (j > 0 && this.array[j] < this.array[j - 1]) {
                let temp = this.array[j - 1];
                this.array[j - 1] = this.array[j];
                this.array[j] = temp;

                this.func(this.array);

                yield false;
                j--;
            }
        }

        yield true;
    }

    sort() {
        let isSorted = this.generator.next();
        if (!isSorted.value) {
            setTimeout(() => this.sort(), this.stepDelay);
        }
    }
}

export default InsertionSorter;