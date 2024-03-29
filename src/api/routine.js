import {Api} from "./api"

export {routineApi, Routine}

class routineApi{

    static getUrl(slug){
        return `${Api.baseUrl}/routines${slug ? `/${slug}` : "" }`;
    }

    static async add(routine, controller){
        return await Api.post(routineApi.getUrl(), true, routine, controller);
    }

    static async modify(fullRoutine, controller){
        return await Api.put(routineApi.getUrl(fullRoutine.id), true, fullRoutine, controller);
    }

    static async get(id, controller){
        return await Api.get(routineApi.getUrl(id), true, controller);
    }

    static async delete(id, controller){
        return await Api.delete(routineApi.getUrl(id), true, controller);
    }

    static async getAll(controller){
        return await Api.get(routineApi.getUrl(), true, controller);
    }

    static async getPage(page, controller){
        return await Api.get(routineApi.getUrl("?page="+page), true, controller);
    }

    static async getQuery(searchQuery, controller){
        return await Api.get(routineApi.getUrl('?search=' + searchQuery), true, controller);
    }

    static async getQueryPage(searchQuery, page,  controller){
        return await Api.get(routineApi.getUrl('?search=' + searchQuery + "&page=" + page), true, controller);
    }

    static async getOrderBy(orderQuery, controller){
        return await Api.get(routineApi.getUrl(orderQuery), true, controller);
    }

    static async getOrderByPage(orderQuery, controller){
        return await Api.get(routineApi.getUrl(orderQuery), true, controller);
    }
}

class Routine {
  //Category es un object de ids
  constructor(name, detail, isPublic, category, difficulty,metadata) {
    this.name = name;
    this.detail = detail;
    this.isPublic = isPublic;
    this.category = category;
    this.difficulty = difficulty;
    this.metadata = metadata
  }
}
