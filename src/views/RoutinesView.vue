<template>
  <div class="d-flex">
    <v-item-group
      mandatory
      class="pa-1 d-flex flex-column"
      style="overflow-y: auto; gap: 32px; height: 100%"
      v-model="selected"
    >
      <v-item
        v-slot="{ active, toggle }"
        v-for="routine in routines"
        :key="routine.id"
      >
        <WorkoutResultCard
          :key="routine.id"
          :name="routine.name"
          :desc="routine.desc"
          :image="routine.image"
          :author="routine.author"
          :avatar="routine.avatar"
          :verified="routine.verified"
          :stars="routine.stars"
          :bookmarks="routine.bookmarks"
          :click="toggle"
          :active="active"
        />
      </v-item>
    </v-item-group>
    <div class="px-8" style="flex: 90%; overflow-y: auto; height: 100%">
      <v-toolbar color="transparent" flat class="mb-4">
        <v-toolbar-title class="font-weight-bold text-h3">{{
          routines[selected]?.name
        }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <div>
          <v-chip class="px-10" color="white" outlined>
            <v-icon left small>edit</v-icon>
            Editar rutina
          </v-chip>
        </div>
      </v-toolbar>

      <div class="d-flex flex-column px-4" style="gap: 16px">
        <div class="text-subtitle-1">
          Calentamiento<v-icon size="20px" class="mx-4">loop</v-icon>2
        </div>
        <div
          style="height: 100px; background-color: #252525; border-radius: 16px"
        ></div>
        <div
          style="height: 100px; background-color: #252525; border-radius: 16px"
        ></div>
        <div
          style="height: 100px; background-color: #252525; border-radius: 16px"
        ></div>
        <div class="text-subtitle-1">
          Principal<v-icon size="20px" class="mx-4">loop</v-icon>4
        </div>
        <div
          style="height: 100px; background-color: #252525; border-radius: 16px"
        ></div>
        <div
          style="height: 100px; background-color: #252525; border-radius: 16px"
        ></div>
        <div
          style="height: 100px; background-color: #252525; border-radius: 16px"
        ></div>
        <div
          style="height: 100px; background-color: #252525; border-radius: 16px"
        ></div>
        <div
          style="height: 100px; background-color: #252525; border-radius: 16px"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import WorkoutResultCard from "@/components/WorkoutResultCard.vue";
import routines from "@/assets/mock/routines.json";
export default {
  name: "RoutinesView",
  components: {
    WorkoutResultCard,
  },
  data: () => ({
    routines: routines,
    items: [
      { icon: "home", title: "Inicio" },
      { icon: "search", title: "Explorar" },
      { icon: "fitness_center", title: "Mis Rutinas" },
    ],
    selected: Number,
  }),
};
</script>