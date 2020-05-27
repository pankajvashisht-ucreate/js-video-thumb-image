'use strict';
const dataURLtoFile = (dataURl, filename) => {
	var arr = dataURl.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);

	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}

	return new File([u8arr], filename, { type: mime });
};

const getExtension = (filename, isVideo) => {
	var name = filename.split('.');
	return {
		fileName: name[0],
		extension: isVideo ? 'png' : name[1] || 'png',
	};
};

const createImage = (video, filename) => {
	var canvas = document.createElement('canvas');
	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;
	canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
	var image = canvas.toDataURL();
	var success = image.length > 100000;
	var file = [];
	var imageUrl = '';
	if (success) {
		file = dataURLtoFile(image, filename);
		imageUrl = URL.createObjectURL(file);
	}
	return [success, file, image, imageUrl];
};

module.exports = {
	dataURLtoFile,
	getExtension,
	createImage,
};
