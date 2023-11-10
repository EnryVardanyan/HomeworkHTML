class MyPromise {
    constructor(executor){
        this.status = "pending"
        this.value = null
        this.error = null

        const resolve = (value) => {
            if(this.status === "pending"){
                this.value = value
                this.status = "fulfilled"
            }
        }
        const reject = (error) => {
            if(this.status === "pending"){
                this.status = "rejected"
                this.error = error
            }
            executor(resolve, reject)
        }
    }
}

