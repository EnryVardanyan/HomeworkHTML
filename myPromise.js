const pending = "pending";
const fulfilled = "fulfilled";
const rejected = "rejected";

class MyPromise {
    constructor(executor) {
        this.status = pending;
        this.result = null;
        this.onFulfilledArr = []
        this.onRejectedArr = []

        const resolve = (value) => {
            if (this.status === pending) {
                this.result = value
                this.status = fulfilled
                this.onFulfilledArr.forEach(fn => fn(value))
            }
        };

        const reject = (error) => {
            if (this.status === pending) {
                this.status = rejected;
                this.result = error;
                this.onRejectedArr.forEach(fn => fn(error))
            }
        };

        try {
            executor(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }

    then(onFulfill, onReject) {
        return new MyPromise((resolve, reject) => {
            if (this.status === fulfilled) {
                try {
                    const result = onFulfill(this.result);
                    resolve(result)
                } catch (err) {
                    reject(err)
                }
            } else if (this.status === rejected) {
                try {
                    const result = onReject(this.result)
                    reject(result)
                } catch (error) {
                    reject(error)
                }
            } else {
                if (onFulfill) {
                    this.onFulfilledArr.push((value) => {
                        try {
                            const result = onFulfill(value);
                            resolve(result)
                        } catch (err) {
                            reject(err)
                        }
                    });
                }
                if (onReject) {
                    this.onRejectedArr.push((error) => {
                        try {
                            const result = onReject(error)
                            reject(result)
                        } catch (err) {
                            reject(err)
                        }
                    });
                }
            }
        });
    }

    catch(onReject) {
        return this.then(null, onReject)
    }
}

const a = new MyPromise((resolve, reject) => {
    resolve("string");
}).then(res => {
    console.log(res);
    return "erer";
}).then(res => {
    console.log(res)
    throw new Error('Error')
}).catch(err => console.log(err.message))