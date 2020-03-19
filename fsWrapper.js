const fs=require('fs')


const database=JSON.parse(fs.readFileSync('./users.json').toString() || '[]');




const exitUser=(person)=>{
	let exit;
	if(database.length!=0){
		database.forEach(ele=>{
			if(ele.User==person.User && ele.Email==person.Email && ele.Phone==person.Phone){
				exit=true;
			}else if(ele.User==person.User){
				exit=true;
			}

		})
	}
	if(exit!=true){
		database.push(person);
		fs.writeFileSync('./users.json',JSON.stringify(database,null,2));

	}
	return exit;

}

const loginUser=(user)=>{
	const userImages=JSON.parse(fs.readFileSync('./userImages.json').toString() || '{}');
	let validata;
	database.forEach(ele=>{
		if(ele.User==user[0] && ele.Password==user[1]){
			validata=true;
			if(userImages[user[0]]!=user[0]){
				userImages[user[0]]=[];
			}
		}
	}) 
	return validata;

}


const load=(user)=>{
	const userImages=JSON.parse(fs.readFileSync('./userImages.json').toString() || '{}');
	return userImages[user[0]];
}


const addingImage=(image)=>{
	const userImages=JSON.parse(fs.readFileSync('./userImages.json').toString() || '{}');
	userImages[image[0]].push(image[1]);
	fs.writeFileSync('./userImages.json',JSON.stringify(userImages,null,2));

}



const profile=(pro)=>{
	const userImages=JSON.parse(fs.readFileSync('./userImages.json').toString() || '{}');

	userImages[pro[0]+'_pic']=pro[1];
	fs.writeFileSync('./userImages.json',JSON.stringify(userImages,null,2));
}

const remove=(user)=>{
	const userImages=JSON.parse(fs.readFileSync('./userImages.json').toString() || '{}');

	userImages[user[0]+'_pic']=userImages["Default_pic"];
	fs.writeFileSync('./userImages.json',JSON.stringify(userImages,null,2));
	return userImages["Default_pic"];

}

const userPic=(user)=>{
	const userImages=JSON.parse(fs.readFileSync('./userImages.json').toString() || '{}');

	if(userImages[user[0]+'_pic']!=undefined){
		return userImages[user[0]+'_pic'];
	}else{
		return userImages["Default_pic"];
	}
}

const userInfo=(user)=>{
	const userImages=JSON.parse(fs.readFileSync('./userImages.json').toString() || '{}');

	let info=[];
	database.forEach(ele=>{
		if(ele.User==user[0]){
			info.push(userImages[user[0]+'_pic'])
			info.push(ele);
		}
	})
	return info;

}

const changeEmail=(mail)=>{
	database.forEach(ele=>{
		if(ele.User==mail[0]){
			ele.Email=mail[1];
			fs.writeFileSync('./users.json',JSON.stringify(database,null,2));
		}
	})

}
const changePass=(pass)=>{
	database.forEach(ele=>{
		if(ele.User==pass[0]){
			ele.Password=pass[1];
			fs.writeFileSync('./users.json',JSON.stringify(database,null,2));
		}
	})

}


const getPassword=(email)=>{
	let getPas;
	database.forEach(ele=>{
		if(ele.Email==email){
			getPas=ele.Password;
		}
	})
	return getPas;
}



module.exports = {
	exitUser,
	loginUser,
	addingImage,
	load,
	profile,
	remove,
	userPic,
	userInfo,
	changeEmail,
	changePass,
	getPassword
}