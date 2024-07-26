export function generateRandomUUID() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = (Math.random() * 16) | 0,
			v = c === 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}


export function createFileUrl(files: any) {

    const filesData = files.map((file: any) => {
     
        // const blob = new Blob([], { type: 'application/octet-stream' });
        // const newFile = new File([blob], file.name, { type: 'application/octet-stream', lastModified: new Date(file.lastModified).getTime() });
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