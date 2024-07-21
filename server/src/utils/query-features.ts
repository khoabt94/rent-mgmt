import { Model, Query } from "mongoose"

type LooseObject = { [key: string]: any }

export class QueryParams {
    queryParams: LooseObject
    model: Model<any>
    queryObject: Query<any, any>
    filterObj: LooseObject
    pagination: {
        page: number
        limit: number
        total: number
    }

    constructor(queryParams: LooseObject, model: Model<any>) {
        this.queryParams = queryParams;
        this.model = model
        this.queryObject = model.find();
        this.filterObj = {}
        this.pagination = {
            page: 0,
            limit: 0,
            total: 0
        }
    }

    filter(invalidQuery: string[]) {
        let queryCloned: any = { ...this.queryParams };
        invalidQuery.forEach(el => delete queryCloned[el]);

        this.queryObject = this.queryObject.find(queryCloned)
        this.filterObj = queryCloned
        return this
    }

    sort() {
        if (this.queryParams.sort) {
            this.queryObject = this.queryObject.sort(this.queryParams.sort as string)
        }
        return this
    }

    async countTotal() {
        const q = this.model.find(this.filterObj)
        const total = await this.model.countDocuments(q)
        this.pagination.total = total

        return this
    }

    paginate() {
        if (this.queryParams.limit) {
            const limit = Number(this.queryParams.limit as string) || 10;
            const page = Number(this.queryParams.page as string) || 1;
            const skip = (page - 1) * limit;
            this.queryObject.skip(skip).limit(limit);
            this.pagination.page = page
            this.pagination.limit = limit
        }
        return this
    }

}