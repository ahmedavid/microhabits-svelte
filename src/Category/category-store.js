import { writable } from 'svelte/store';

const categoryStore = writable([
  // {id:1,name: 'Pushups'},
  // {id:2,name: 'Pullups'},
  // {id:3,name: 'Squats'},
]);

const customCategoryStore = {
  subscribe: categoryStore.subscribe,
  toggleActiveCategory: (item) =>{
    categoryStore.update(items => {
      const itemToUpdate = items.find(i => i.id === item.id);
      return [...items]
    });
  },
  addCategory: (item) => {
    categoryStore.update(items => [...items,item]);
  },
  editCategory: (item) => {
    categoryStore.update(items => {
      const editedIndex = items.findIndex(i => i.id === item.id);
      if(editedIndex != -1) {
        items[editedIndex] = item;
        return [...items]
      }
      return [...items];
    });
  },
  deleteCategory: (id) => {
    categoryStore.update(items => items.filter(i => i.id !== id));
  },
  setCategories: (items) => {
    categoryStore.set([...items]);
  },
  clearCategories: () => categoryStore.set([])
};

export default customCategoryStore;