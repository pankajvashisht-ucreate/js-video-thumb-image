# js-video-thumb-image

[![npm version](https://badge.fury.io/js/codsi-client.svg)](https://badge.fury.io/js/codsi-client)

Create thumb image from video with input type file

## Browser Support

| ![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Latest ✔                                                                                 | Latest ✔                                                                                    | Latest ✔                                                                                 | Latest ✔                                                                              | Latest ✔                                                                           | 11 ✔                                                                                                                         |

## Installing

Using npm:

```bash
$ npm install js-video-thumb-image
```

Using bower:

```bash
$ bower install js-video-thumb-image
```

Using yarn:

```bash
$ yarn add js-video-thumb-image
```

## Example

```js
// used in comman js

const thumbImage = require('js-video-thumb-image');
document
	.getElementsByTagName('input')[0]
	.addEventListener('change', function (event) {
		var file = event.target.files[0];
		createImages(file)
			.then((data) => {
				console.log(data);
			})
			.catch((err) => {
				console.log(err);
			});
	});
// In success data will get object

{
	File: File; // file data
	base64Image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAA'; // base64 data
	error: false; // error false;
	imageUrl: 'blob:null/86bbb246-47a5-4285-aa0c-2a3532b58d53'; // image url
	__proto__: Object;
}
// asnyc and await
const getThumbImage = async (image, fileName) => {
	const { imageUrl, File, error, base64Image } = await thumbImage(
		image,
		fileName
	);
	if (!error) {
		// view,  upload
	}
};
```

## using React and vue

```js
import React from 'react';
import thumbImage from 'js-video-thumb-image';
const thumb = () => {
	const [file, setFile] = React.useState([]);
	const [viewImage, setViewImage] = React.useState();
	const createThumb = async (event) => {
		const { File, error, imageUrl } = await thumbImage(
			event.target.files[0],
			'mythumbimage.png'
		);
		if (!error) {
			setViewImage(imageUrl);
		}
	};
	return (
		<>
			<input type='file' accept='video.*' onChange={createThumb} />
			<img src={viewImage} alt='img' />
		</>
	);
};
```

## License

[MIT](LICENSE)
