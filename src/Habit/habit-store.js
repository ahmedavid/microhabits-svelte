import { writable } from 'svelte/store';

const todayDate = new Date().toLocaleDateString();
//const todayDate = "6232019";

const habitStore = writable();

const customHabitStore = {
  subscribe: habitStore.subscribe,
  set: (dates) => {
    const localObj = {};
    for(let key in dates) {
      const fbId = key;
      const date = dates[key]['date'] ? dates[key]['date'] : todayDate;
      const habits = dates[key]['habits'] ? dates[key]['habits'] : [];
      localObj[date] = {id:fbId,habits}
    }
    habitStore.set(localObj);
  },
  addDay: () => {
    habitStore.update( async (items) => {
      const foundDay = items[todayDate];
      if(!foundDay) {
        const id = await initDayInFirebase(todayDate);
        const objToReturn = {...items,[todayDate]:{id,habits:[]}};
        console.log(objToReturn)
        return objToReturn;
      }
      return {...items};
    })
  },
  addHabit: (category,goal) => {
    habitStore.update( items => {
      //let today = "6/22/2019";
      const todayObj = items[todayDate];
      if(todayObj) {
        const existingHabitIndex = todayObj.habits.findIndex(h => h.name === category.name);
        if(existingHabitIndex === -1){
          todayObj.habits.push({name: category.name,count:0,goal});
          const {[todayDate]:obj,...otherDays} = items;
          return {...otherDays,[todayDate]:todayObj};
          }
        }
        return {...items};
    })
  },
  increment: (exerciseName) => {
    habitStore.update(items => {
      //let today = "6/22/2019";
      const {[todayDate]:todayObj,...otherDays} = items;
      if(todayObj) {
        const exerciseIndex = todayObj.habits.findIndex( h => h.name === exerciseName);
        if(exerciseIndex !== -1) {
          const {count,goal} = todayObj.habits[exerciseIndex];
          if(count < goal){
            todayObj.habits[exerciseIndex].count++;
          }
          return {...otherDays,[todayDate]:todayObj}
        }
      }
      return {...items};
    });
  }
};

export default customHabitStore;