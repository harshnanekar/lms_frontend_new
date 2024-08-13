import type { CustomOptions } from '$lib/components/ui/select/helper.select';

// a function to return previous year current year and next year
export function getAcadYear(): CustomOptions[] {
	const currentYear = new Date().getFullYear();
	return [
		{
			value: currentYear - 1,
			label: `${currentYear - 1}`
		},
		{
			value: currentYear,
			label: `${currentYear}`
		},
		{
			value: currentYear + 1,
			label: `${currentYear + 1}`
		}
	];
}

export function getAbdcIndexed(data : any) : CustomOptions[] {
  let adbcArr : any[] = [];
  if(!data) return [];

  data.forEach((item : any) => {
	adbcArr.push({value: item.id, label: item.abdc_type});
  });

  return adbcArr;
}

export function getPaperType(data : any) :CustomOptions[] {
	let paperArr : any[] = [];
	if(!data) return [];

	data.forEach((item : any) => {
		paperArr.push({value: item.id, label: item.paper_name});
	});
  
	return paperArr;
}

export function getSchool(data : any) :CustomOptions[] {
	let schoolArr : any[] = [];
	if(!data) return [];

	data.forEach((item : any) => {
		schoolArr.push({value: item.organization_name, label: item.organization_name});
	});
  
	return schoolArr;
}

export function getCampus(data : any) :CustomOptions[] {
	let campusArr : any[] = [];
	if(!data) return [];

	data.forEach((item : any) => {
		campusArr.push({value: item.campus_name, label: item.campus_name});
	});
  
	return campusArr;
}

export function getPolicyCadre(data : any) :CustomOptions[] {
	let policyArr : any[] = [];
	if(!data) return [];

	data.forEach((item : any) => {
		policyArr.push({value: item.id, label: item.policy_name});
	});
  
	return policyArr;
}

export function getAllAuthor(data : any) :CustomOptions[] {
	let authArr : any[] = [];
	if(!data) return [];

	data.forEach((item : any) => {
		authArr.push({value: item.id, label: item.faculty_name});
	});
  
	return authArr;
}

export function getNmimsAuthor(data : any) :CustomOptions[] {
	let nmimsAuthArr : any[] = [];
	if(!data) return [];

	data.forEach((item : any) => {
		nmimsAuthArr.push({value: item.id, label: item.faculty_name});
	});
  
	return nmimsAuthArr;
}


export function getEditors(data: any) :CustomOptions[]{
	let editors : any[] = []; 
	if(!data) return [];

	data.forEach((item : any) => {
		editors.push({value: item.id, label: item.name});
	});
  
	return editors;

}

export function getOtherAuthor(data : any) :CustomOptions[] {
	let otherAuthArr : any[] = [];
	if(!data) return [];

	data.forEach((item : any) => {
		otherAuthArr.push({value: item.id, label: item.name});
	});
  
	return otherAuthArr;
}

export function getForeignAuthor(data : any) :CustomOptions[] {
	let foreignAuthArr : any[] = []; 
	if(!data) return [];

	data.forEach((item : any) => {
		foreignAuthArr.push({value: item.id, label: item.name});
	});
  
	return foreignAuthArr;
}

export function getStudentAuthor(data : any) :CustomOptions[] {
	let studentAuthArr : any[] = []; 
	if(!data) return [];

	data.forEach((item : any) => {
		studentAuthArr.push({value: item.id, label: item.name});
	});
  
	return studentAuthArr;
}

export function getInputFields(data:any) : CustomOptions[] {
	let inputFieldsArr : any[] = []; 
	if(!data) return [];

	data.forEach((item : any) => {
		inputFieldsArr.push({value: item.url, label: item.name});
	});
  
	return inputFieldsArr;
}

export function getTeachingDropdown(data:any) : CustomOptions[] {
	let inputFieldsArr : any[] = []; 
	if(!data) return [];

	data.forEach((item : any) => {
		inputFieldsArr.push({value: item.abbr, label: item.input});
	});
  
	return inputFieldsArr;
}

export function getMeetingDropdown(data:any) : CustomOptions[] {
	let inputFieldsArr : any[] = []; 
	if(!data) return [];

	data.forEach((item : any) => {
		inputFieldsArr.push({value: item.abbr, label: item.input});
	});
  
	return inputFieldsArr;
}

export function getBrandingDropdown(data:any) : CustomOptions[] {
	let inputFieldsArr : any[] = []; 
	if(!data) return [];

	data.forEach((item : any) => {
		inputFieldsArr.push({value: item.abbr, label: item.input});
	});
  
	return inputFieldsArr;
} 


export function getMasterAllAuthors(data:any) : CustomOptions[] {
    let inputFieldsArr : any[] = []; 
	if(!data) return [];
	
    data.forEach((item : any) => {
        inputFieldsArr.push({value: item.id, label: item.name});
    });
	
    return inputFieldsArr;
}  



export function getMasterNmimsAuthors(data:any) : CustomOptions[] {
    let inputFieldsArr : any[] = []; 
	if(!data) return [];

    data.forEach((item : any) => {
        inputFieldsArr.push({value: item.id, label: item.name});
    });
  
    return inputFieldsArr;
} 

export function getCommonDropdownData(data:any) : CustomOptions[] {
	let inputFieldsArr : any[] = [];  
	if(!data) return [];

	data.forEach((item : any) => {
		inputFieldsArr.push({value: item.abbr, label: item.input});
	});
  
	return inputFieldsArr;
}

export function getFacultyType(data:any) : CustomOptions[] {
	let inputFieldsArr : any[] = []; 
	if(!data) return [];

	data.forEach((item : any) => {
		inputFieldsArr.push({value: item.id, label: item.faculty_type});
	});
   return inputFieldsArr;
} 




export function getExternalAuthors(data:any) : CustomOptions[] {
    let inputFieldsArr : any[] = []; 
	if(!data) return [];

    data.forEach((item : any) => {
        inputFieldsArr.push({value: item.id, label: item.faculty_name});
    });
  
    return inputFieldsArr;
} 

export function getEnternalAuthors(data:any) : CustomOptions[] {
    let inputFieldsArr : any[] = []; 
	if(!data) return [];
	console.log("data><><><><><><>", data)
    data.forEach((item : any) => {
        inputFieldsArr.push({value: item.id, label: item.faculty_name});
    });
	console.log("getEnternalAuthors>>>>>>", inputFieldsArr);
	
    return inputFieldsArr;
}  



export function getResearchStatus(data : any) :CustomOptions[] {
	let statusArr : any[] = []; 
	if(!data) return [];

	data.forEach((item : any) => {
		statusArr.push({value: item.id, label: item.status});
	});
  
	return statusArr;
} 



export function getSdgGoals(data : any) :CustomOptions[] {
	let sgdArr : any[] = []; 
	if(!data) return [];

	data.forEach((item : any) => {
		sgdArr.push({value: item.id, label: item.goals_name});
	});
  
	return sgdArr;
} 

export function getPatentStatus(data : any) :CustomOptions[] {
	let statusArr : any[] = []; 
	if(!data) return [];

	data.forEach((item : any) => {
		statusArr.push({value: item.id, label: item.patent_status});
	});
  
	return statusArr;
} 


export function getInventionType(data : any) :CustomOptions[] {
	let inventionArr : any[] = []; 
	if(!data) return [];

	data.forEach((item : any) => {
		inventionArr.push({value: item.id, label: item.invention_type});
	});
  
	return inventionArr;
} 



export function getApplicantNames(data : any) :CustomOptions[] {
	let statusArr : any[] = []; 
	if(!data) return [];

	data.forEach((item : any) => {
		statusArr.push({value: item.id, label: item.name});
	});
  
	return statusArr;
}   


export function getMasterInputType(data : any) :CustomOptions[] {
	let statusArr : any[] = []; 
	if(!data) return [];

	data.forEach((item : any) => {
		statusArr.push({value: item.id, label: item.name});
	});
  
	return statusArr;
} 

export function getFormLevel(data:any) : CustomOptions[] {
	let inputFieldsArr : any[] = []; 
	if(!data) return [];

	data.forEach((item : any) => {
		let label = item.abbr === 'cp' ? 'Approve' : 'Reject'
		inputFieldsArr.push({value: item.id, label: label});
	});
  
	return inputFieldsArr;
}

export function getDynamicDropdown(data: any): CustomOptions[] {
	console.log('dynamic dropdown', JSON.stringify(data));
	let inputFieldsArr: CustomOptions[] = [];
	if(!data) return [];

  
	data.forEach((item: any) => {
		inputFieldsArr.push({ value: item.value, label: item.label });	  
	});
  
	return inputFieldsArr;
  }

export function getFormModules(data:any) : CustomOptions[] {
	console.log('dynamic dropdown',JSON.stringify(data))
	let inputFieldsArr : CustomOptions[] = []; 
	if(!data) return [];

	data.forEach((item : any) => {
		inputFieldsArr.push({value: item.url, label: item.module_name});
	});
  
	return inputFieldsArr;
}