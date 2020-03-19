let currentUser;


function signUp(){
	const user=document.getElementById("user");
	const email=document.getElementById("email");
	const phone=document.getElementById("phone");
	const password=document.getElementById("password");
	const confirm=document.getElementById("confirm");
	const emailRgx=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ 
	if(user.value !="" && email.value !="" && phone.value !="" && password.value !="" && confirm.value !=""){
		if(email.value.match(emailRgx)){
			if(phone.value.length==10){
				if(password.value == confirm.value){
					const newUser={
						User:user.value,
						Email:email.value,
						Phone:phone.value,
						Password:password.value
					}
					fetch('api/register', {
						method: 'POST',
						body: JSON.stringify(newUser),
						headers: {
							'Content-Type': 'application/json'
						}
					})
					.then(res=>{
						return res.json();
					})
					.then(err=>{
						if(err=='Sucessfull Register'){
							alert(err);
							user.value=null;
							email.value=null;
							phone.value=null;
							password.value=null;
							confirm.value=null;
						}else{
							alert(err);
							user.value=null;
							email.value=null;
							phone.value=null;
							password.value=null;
							confirm.value=null;
						}
					})

				}else{
					alert("Password InCorrect");
					confirm.value=null;
				}
			}else{
				alert("Only Enter 10 digit Phone Number");
				phone.value=null;
			}
		}else{
			alert("InCorrect Email Id");
			email.value=null;
		}
	}else{
		alert("Your Must Fill All Fields")
	}

}

function logIn(){
	const name=document.getElementById("name");
	const pass=document.getElementById("pass");
	if(name.value!="" && pass.value !=""){
		fetch('api/login',{
			method:'POST',
			body:JSON.stringify([name.value,pass.value]),
			headers:{
				'Content-Type' : 'application/json'
			}
		})
		.then(res=>{
			return res.json();
		})
		.then(err=>{
			if(err==name.value){
				let user=name.value;
				name.value=null;
				pass.value=null;
				window.location.href='http://localhost:3000/dashboard?user='+user;

			}else{
				alert(err);
				name.value=null;
				pass.value=null;

			}
		})
	}else{
		alert("Please Enter User Name Or Password");

	}
}




function changeProfile(){
	let change=document.getElementById("my-file");
	change.click();
	let profileImage=document.getElementById('profile-pic');
	change.onchange = function() {
		if (this.files && this.files[0]) {
			var reader = new FileReader();
			reader.onload = function(e) {
				let imgPro;
				profileImage.setAttribute('src', e.target.result);
				imgPro=profileImage.src;
				storeProfile(imgPro);
			};
			reader.readAsDataURL(this.files[0]);
		}
	}
}

function removePicture(){
	let name=document.getElementById("profile").textContent;
	fetch('api/remove',{
		method:'POST',
		body:JSON.stringify([name]),
		headers:{
			'Content-Type' : 'application/json'
		}
	})
	.then(res=>res.json())
	.then(img=>{
		document.getElementById('profile-pic').src=img;
		document.getElementById("remove").style.visibility="hidden";
	})
}

function userPicture(pic){
	fetch('api/userPic',{
		method:'POST',
		body:JSON.stringify([currentUser]),
		headers:{
			'Content-Type' : 'application/json'
		}	
	})
	.then(res=>{
		return res.json()
	})
	.then(img=>{
		document.getElementById('profile-pic').src=img;
	})
}



function storeProfile(imgPro){
	fetch('api/store',{
		method:'POST',
		body:JSON.stringify([currentUser,imgPro]),
		headers:{
			'Content-Type' : 'application/json'
		}
	})
	.then(res=>{
		return res.json()
	})
	.then(res=>{
		alert(res);
		document.getElementById("remove").style.visibility="visible";

	})

} 


function dashBoard(user){
	currentUser=user;
	let i=0;
	fetch('api/load?user='+user)
	.then(res=>res.json())
	.then(x=>{
		x.forEach(ele=>{
			i++;
			const divBody = document.getElementById("images");
			const div=document.createElement("div")
			div.setAttribute('class','imgCon');
			const listImages = document.createElement('IMG');
			listImages.setAttribute('src',ele);
			listImages.setAttribute('class','imag');
			const over=document.createElement("div");
			over.setAttribute('class','overl');
			over.innerHTML="Picture "+i;
			div.appendChild(listImages);
			div.appendChild(over);
			divBody.appendChild(div);
		})
	});
	let profileName=document.getElementById("profile");
	profileName.innerHTML='<a href=http://localhost:3000/profile?user='+user+'>'+user+'</a>';
	userPicture(user)

}


function addImage(){
	let add=document.getElementById("add-file");
	add.click();
	let image=document.getElementById('imag1');
	add.onchange = function() {
		if (this.files && this.files[0]) {
			var reader = new FileReader();
			reader.onload = function(e) {
				image.setAttribute('src', e.target.result);
				let img1=image.src
				fetch('api/addImages',{
					method:'POST',
					body:JSON.stringify([currentUser,img1]),
					headers:{
						'Content-Type' : 'application/json'
					}
				})
				.then(res=>{
					return res.json();
				})
				.then(res=>{
					alert(res)
					image.setAttribute('src',"");
					window.location.reload();
					document.getElementById("remove").style.visibility="visible";

				})
			}
			reader.readAsDataURL(this.files[0]);

		}
	}
}


function profileInfo(user){
	fetch('api/userInfo',{
		method:'POST',
		body:JSON.stringify([user]),
		headers:{
			'Content-Type' : 'application/json'
		}
	})
	.then(res=>{
		return res.json();
	})
	.then(arr=>{
		arr.forEach(ele=>{
			if(typeof ele !='object'){
				document.getElementById("userImg").src=ele;
			}else{
				document.getElementById("usrName").innerHTML=ele.User;
				document.getElementById("usrMail").innerHTML=ele.Email;
				document.getElementById("usrPhone").innerHTML=ele.Phone;
				document.getElementById("usrPas").innerHTML=ele.Password;
			}
		})

	})
}


function emailEdit(){
	const Edmail=document.getElementById("emai")
	const emaiIn=document.createElement("INPUT");
	emaiIn.setAttribute('type','text');
	emaiIn.setAttribute('id','mail');
	Edmail.appendChild(emaiIn);
}


function emailSave(){
	let changemail=document.getElementById("mail");
	const emailRgx=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ 
	if(changemail.value.match(emailRgx)){
		let user=document.getElementById("usrName").textContent;
		fetch('api/changemail',{
			method:'POST',
			body:JSON.stringify([user,changemail.value]),
			headers:{
				'Content-Type' : 'application/json'
			}
		})
		.then(res=> {
			return res.json()
		})
		.then(res=>{
			alert(res);
			window.location.reload();

		})
	}else{
		alert("Please Enter Valid Email");
		changemail.value=null;
	}
}


function pasEdit(){
	const passId=document.getElementById("pass")
	const pasIn=document.createElement("INPUT");
	pasIn.setAttribute('type','password');
	pasIn.setAttribute('id','pas');
	passId.appendChild(pasIn);

}


function pasSave(){
	let user=document.getElementById("usrName").textContent;
	let paschange=document.getElementById("pas")
	fetch('api/changepas',{
		method:'POST',
		body:JSON.stringify([user,paschange.value]),
		headers:{
			'Content-Type' : 'application/json'
		}
	})
	.then(res=> {
		return res.json()
	})
	.then(res=>{
		alert(res);
		window.location.reload();

	})

}

function logOut(){
	alert("LogOut Sucessfull");
	window.location.href='http://localhost:3000/web';

}
function backDash(){
	let user=document.getElementById("usrName").textContent;
	window.location.href='http://localhost:3000/dashboard?user='+user;
}


function userlogIn(){
	window.location.href='http://localhost:3000/web';
}

function CheckPassword(){
	let userMail=document.getElementById("usermail")
	fetch('api/getPassword?email='+userMail.value)
	.then(res=>res.json())
	.then(res=>{
		if(res!=undefined){
			document.getElementById("passWor").innerHTML='Your Password Is :  '+res;
			userMail.value=null;   
		}else{
			alert('Invalid Email-Id');
			userMail.value=null
		}
	})

}

