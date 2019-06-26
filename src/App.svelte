<script>
	import {onDestroy,onMount,} from 'svelte';
	import HttpService from './Helpers/httpService.js';
	import categoryStore from './Category/category-store.js';	
	import habitStore from './Habit/habit-store.js';
	import CategoryList from './Category/CategoryList.svelte';
	import LoadingSpinner from './Common/LoadingSpinner.svelte';
	import Navbar from './Common/Navbar.svelte';
	import Auth from './Common/Auth.svelte';
	import About from './Common/About.svelte';
	import HabitGrid from './Habit/HabitGrid.svelte';
	import Modal from './Common/Modal.svelte';

	const firebaseConfig = {
    apiKey: "AIzaSyDIeNu92FxfbK7JuLPkvsJwPN7Wsb-KT3o",
    authDomain: "davidahmadovdev.firebaseapp.com",
    databaseURL: "https://davidahmadovdev.firebaseio.com",
    projectId: "davidahmadovdev",
    storageBucket: "davidahmadovdev.appspot.com",
    messagingSenderId: "51927438647",
    appId: "1:51927438647:web:e6e0917275957edc"
	};
	let signedInUserEmail = null;
	let fbUserId = null;
	let fbApp = null;
	let isLoading = false;
	let isModalOpen = false;
	let currentPage = 'habits';
	const todayDate = new Date().toLocaleDateString();
	//const todayDate = "6232019";
	let categories = [];
	let habits = [];
	let todayObj = {
		habits:[]
	};
	let dates = {};
	categoryStore.subscribe(items =>{
		categories = [...items];
		//console.log("Categories: ",categories)
	});
	habitStore.subscribe(items =>{
		dates = {...items};
		console.log("DATES: ",dates)
		if(items){
			todayObj = items[todayDate] ? items[todayDate] : {habits:[]};
		} else {
			todayObj = {habits:[]};
		}
	});

  function signOut(ev) {
    firebase.auth().signOut().then(function() {
			signedInUserEmail = null;
      console.log("User signed out")
    }).catch(function(error) {
      console.error(error)
    });    
  }	

	function setPage(e) {
		currentPage = e.detail;
	}

  async function getCategories() {
    const categoriesObject = await HttpService.get('categories.json');
    const categoriesArray = [];
    for(const key in categoriesObject) {
      categoriesArray.push({id:key,name:categoriesObject[key]['name'],isActive:categoriesObject[key]['isActive']})
    }
    categoryStore.setCategories(categoriesArray)
	}
	

	function initializeFirabaseApp() {
		fbApp = firebase.initializeApp(firebaseConfig);
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				// User is signed in.
				// var displayName = user.displayName;
				// var email = user.email;
				// var emailVerified = user.emailVerified;
				// var photoURL = user.photoURL;
				// var isAnonymous = user.isAnonymous;
				// var uid = user.uid;
				// var providerData = user.providerData;
				signedInUserEmail = user.email;
				fbUserId = user.uid;
				loadUserData();
				console.log("Firebase User:", user)
			} else {
				console.log("USER IS NOT SIGNED IN!!!")
				isLoading = false;
			}
		});		
	}

	async function loadUserData() {
		isLoading = true;
		console.log(`${todayDate}###${fbUserId}`);
		const currDateFromFb = await HttpService.get(`dates.json?orderBy="date"&equalTo="${todayDate}@${fbUserId}"`);
		debugger
		if(isEmptyObject(currDateFromFb)){
			//Response empty object means we have to initialize new day
			const dateIdFromFb = await initDayInFirebase();
		} 
		const datesFromDB = await getDates();
		if(!isEmptyObject(datesFromDB)) {
			habitStore.set(datesFromDB);
		}
		isLoading = false;
		
	}


	onMount(async () =>{
		isLoading = true;
		initializeFirabaseApp();
		await getCategories();
	});


	async function initDayInFirebase() {
		const response = await HttpService.post('dates.json',{date:`${todayDate}@${fbUserId}`});
		const dayId = response['name'];
		return dayId;
	}

	async function getDates() {
		return await HttpService.get('dates.json');
	}
	
	async function saveChanges(ev) {
		debugger
		const todayObj = dates[todayDate];
		if(!isEmptyObject(todayObj)) {
			const fbKey = todayObj['id'];
			const transformedDate = {};
			transformedDate['date'] = todayDate;
			transformedDate['habits'] = todayObj['habits'];
			await HttpService.patch(`dates/${fbKey}.json`,transformedDate);
		}
	}
	// async function getDays(ev) {
	// 	const res = await HttpService.get('days.json',days);
	// 	console.log(res)
	// }

	function isEmptyObject(obj) {
		return Object.entries(obj).length === 0 && obj.constructor === Object;
	}

	function openModal(ev) {
		isModalOpen = true;
	}
	function closeModal(ev) {
		isModalOpen = false;
	}
</script>

<style>
	h1 {
		color: purple;
	}
</style>

<Navbar {currentPage} on:navigate={setPage} on:signout={signOut} {signedInUserEmail}/>

{#if isLoading}
	<div class="row">
		<div class="col-4 offset-4 d-flex justify-content-center">
		<LoadingSpinner/>
		</div>
	</div>
{/if}

{#if signedInUserEmail}
	{#if currentPage === 'habits'}
		<HabitGrid habits={todayObj.habits} {categories} on:savechanges={saveChanges}/>
	{:else if currentPage === 'categories'}
		<CategoryList {categories}/>
	{:else if currentPage === 'about'}
		<About/>
	{/if}
{:else}
	{#if !isLoading}
	<Auth/>
	{/if}
{/if}






{#if isModalOpen}
	<Modal on:close={closeModal}></Modal>
{/if}

<!-- <button  on:click={openModal}>Open Modal</button> -->