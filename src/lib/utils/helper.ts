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
