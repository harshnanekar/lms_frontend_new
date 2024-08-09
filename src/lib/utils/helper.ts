export function generateRandomUUID() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = (Math.random() * 16) | 0,
			v = c === 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}


export function createFileUrl(files: any) {

    const filesData = files.map((file: any) => {
        return {
            file: [],
            name: file.name,
            url: file.url,
            id: generateRandomUUID(),
        };
    });

    return filesData;
}


export function createFileUrlFilter(files: any, typeAbbr: string) {
    console.log('type_abbr', typeAbbr)
    const filesData = files
        .filter((file: any) => file.type_abbr === typeAbbr)
        .map((file: any) => {
            // Create a blob and new file object if needed, commented out for now
            // const blob = new Blob([], { type: 'application/octet-stream' });
            // const newFile = new File([blob], file.name, { type: 'application/octet-stream', lastModified: new Date(file.lastModified).getTime() });
            return {
                file: [], // You can modify this part to create actual file objects if needed
                name: file.name,
                url: file.url,
                id: generateRandomUUID(), // Using the uuid library to generate UUIDs
            };
        });

    console.log('filesData ===>>>', filesData)

    return filesData;
}

export const tableObj : any = {
    1 : {name:"journal-paper" , abbr : ""},
    2 : {name :"book-publication",abbr: ""},
    3 : {name :"edited-book-publication",abbr:""},
    4 : {name:"book-chapter-publication",abbr:""},
    5 : {name:"conference",abbr:""},
    6 : {name:"project",abbr:""},
    7 : {name:"patent-submission-and-grant",abbr:""},
    8 : {name:"ipr",abbr:""},
    9 : {name:"award",abbr:""},
    10 : {name:"e-content",abbr:""},
    11 : {name:"seminars",abbr:""},
    12 : {name:"case-study",abbr:""},
    13 : {name:"teaching-meeting-branding",abbr:"/te"},
    14 : {name:"teaching-meeting-branding",abbr:"/ms"},
    15 : {name:"teaching-meeting-branding",abbr:"/ba"} 
}
