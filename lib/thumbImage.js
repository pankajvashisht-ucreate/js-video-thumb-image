'use strict';
var { createImage, getExtension } = require('./utils/helper');
module.exports = function thumbImage(data, filename) {
	return new Promise((resolve, reject) => {
		var file = data.name ? data : data[0];
		var isVideo = fileName ? 0 : 1;
		var { fileName, extension } = getExtension(filename || file.name, isVideo);
		fileName = `${fileName}.${extension}`;
		if (file.type.match('video.*')) {
			try {
				var fileReader = new FileReader();
				fileReader.onload = function () {
					var blob = new Blob([fileReader.result], { type: file.type });
					var url = URL.createObjectURL(blob);
					var video = document.createElement('video');
					var timeupdate = function () {
						var [status, File, base64Image, imageUrl] = createImage(
							video,
							fileName
						);
						if (status) {
							video.removeEventListener('timeupdate', timeupdate);
							video.pause();
							resolve({ File, imageUrl, base64Image, error: false });
						}
					};
					video.addEventListener('loadeddata', function () {
						var [status, File, base64Image, imageUrl] = createImage(
							video,
							fileName
						);
						if (status) {
							video.removeEventListener('timeupdate', timeupdate);
							resolve({ File, imageUrl, base64Image, error: false });
						}
					});
					video.addEventListener('timeupdate', timeupdate);
					video.preload = 'metadata';
					video.src = url;
					// Load video in Safari / IE11
					video.muted = true;
					video.playsInline = true;
					video.play();
				};
				fileReader.readAsArrayBuffer(file);
			} catch (err) {
				reject({ error: true, errorDetails: err });
			}
		} else {
			reject({
				error: true,
				errorDetails: {
					wrongFile: true,
					message: 'File type is not video',
				},
			});
		}
	});
};
