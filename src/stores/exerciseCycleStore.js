import { defineStore } from "pinia";
import { exerciseCycleApi, cycleExercise } from "@/api/exerciseCycle";

export { useExerciseCycleStore };

const useExerciseCycleStore = defineStore("exerciseCycle", {
  state: () => ({ items: [] }),
  getters: {},
  actions: {
    push(fullExerciseCycle) {
      this.items.push(fullExerciseCycle);
    },
    replace(index, fullExerciseCycle) {
      this.items[index] = fullExerciseCycle;
    },
    splice(index) {
      this.items.splice(index, 1);
    },
    async getAllExerciseCycles(cycleId) {
      const result = await exerciseCycleApi.getAll(cycleId);
      return result;
    },
    async getExerciseCycle(cycleId, exerciseId, fullExerciseCycle) {
      const index = this.items.findIndex(fullExerciseCycle);
      if (index >= 0) {
        return this.items[index];
      }
      const result = await exerciseCycleApi.get(
        cycleId,
        exerciseId,
        fullExerciseCycle.id
      );
      this.items.push(result);
      return result;
    },
    async addExerciseCycle(cycleId, exerciseId, order, duration, repetitions) {
      const result = await exerciseCycleApi.add(
        cycleId,
        exerciseId,
        new cycleExercise(order, duration, repetitions)
      );
      this.items.push(result);
      return result;
    },
    async modifyExerciseCycle(cycleId, exerciseId, fullExerciseCycle) {
      const result = await exerciseCycleApi.modify(
        cycleId,
        exerciseId,
        fullExerciseCycle
      );
      // TODO: Fix null object
      /*const index = this.items.findIndex(fullExerciseCycle);
      if (index >= 0) {
        this.replace(index, result);
      }*/
      return result;
    },
    async deleteExerciseCycle(cycleId, exerciseId, fullExerciseCycle) {
      return await exerciseCycleApi.delete(cycleId, exerciseId, fullExerciseCycle.id);
      /*const index = this.items.findIndex(fullExerciseCycle);
      if (index >= 0) {
        return this.splice(index);
      }*/
    },
  },
});
