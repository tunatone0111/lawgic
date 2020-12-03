import React, { useEffect } from "react";
import "./Logo.css";

export default function Logo() {
	useEffect(() => {
		const logo = document.querySelectorAll("#logo path");
		for (let i = 0; i < logo.length; i = i + 1) {
			console.log(logo[i].getTotalLength());
		}
	}, []);
	return (
		<svg
			width="100%"
			height="100%"
			id="logo"
			viewBox="0 0 120 82"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M27.5156 35.2109L28.2891 35.375L25.5703 44H0.960938V43.1328H2.15625C3.5 43.1328 4.46094 42.6953 5.03906 41.8203C5.36719 41.3203 5.53125 40.1641 5.53125 38.3516V17.8438C5.53125 15.8594 5.3125 14.6172 4.875 14.1172C4.26562 13.4297 3.35938 13.0859 2.15625 13.0859H0.960938V12.2188H15.3516V13.0859C13.6641 13.0703 12.4766 13.2266 11.7891 13.5547C11.1172 13.8828 10.6562 14.2969 10.4062 14.7969C10.1562 15.2969 10.0312 16.4922 10.0312 18.3828V38.3516C10.0312 39.6484 10.1562 40.5391 10.4062 41.0234C10.5938 41.3516 10.8828 41.5938 11.2734 41.75C11.6641 41.9062 12.8828 41.9844 14.9297 41.9844H17.25C19.6875 41.9844 21.3984 41.8047 22.3828 41.4453C23.3672 41.0859 24.2656 40.4531 25.0781 39.5469C25.8906 38.625 26.7031 37.1797 27.5156 35.2109ZM43.0078 40.9062C40.8047 42.6094 39.4219 43.5938 38.8594 43.8594C38.0156 44.25 37.1172 44.4453 36.1641 44.4453C34.6797 44.4453 33.4531 43.9375 32.4844 42.9219C31.5312 41.9062 31.0547 40.5703 31.0547 38.9141C31.0547 37.8672 31.2891 36.9609 31.7578 36.1953C32.3984 35.1328 33.5078 34.1328 35.0859 33.1953C36.6797 32.2578 39.3203 31.1172 43.0078 29.7734V28.9297C43.0078 26.7891 42.6641 25.3203 41.9766 24.5234C41.3047 23.7266 40.3203 23.3281 39.0234 23.3281C38.0391 23.3281 37.2578 23.5938 36.6797 24.125C36.0859 24.6562 35.7891 25.2656 35.7891 25.9531L35.8359 27.3125C35.8359 28.0312 35.6484 28.5859 35.2734 28.9766C34.9141 29.3672 34.4375 29.5625 33.8438 29.5625C33.2656 29.5625 32.7891 29.3594 32.4141 28.9531C32.0547 28.5469 31.875 27.9922 31.875 27.2891C31.875 25.9453 32.5625 24.7109 33.9375 23.5859C35.3125 22.4609 37.2422 21.8984 39.7266 21.8984C41.6328 21.8984 43.1953 22.2188 44.4141 22.8594C45.3359 23.3438 46.0156 24.1016 46.4531 25.1328C46.7344 25.8047 46.875 27.1797 46.875 29.2578V36.5469C46.875 38.5938 46.9141 39.8516 46.9922 40.3203C47.0703 40.7734 47.1953 41.0781 47.3672 41.2344C47.5547 41.3906 47.7656 41.4688 48 41.4688C48.25 41.4688 48.4688 41.4141 48.6562 41.3047C48.9844 41.1016 49.6172 40.5312 50.5547 39.5938V40.9062C48.8047 43.25 47.1328 44.4219 45.5391 44.4219C44.7734 44.4219 44.1641 44.1562 43.7109 43.625C43.2578 43.0938 43.0234 42.1875 43.0078 40.9062ZM43.0078 39.3828V31.2031C40.6484 32.1406 39.125 32.8047 38.4375 33.1953C37.2031 33.8828 36.3203 34.6016 35.7891 35.3516C35.2578 36.1016 34.9922 36.9219 34.9922 37.8125C34.9922 38.9375 35.3281 39.875 36 40.625C36.6719 41.3594 37.4453 41.7266 38.3203 41.7266C39.5078 41.7266 41.0703 40.9453 43.0078 39.3828ZM50.9766 22.5312H59.9766V23.3984C59.1484 23.4609 58.6016 23.6094 58.3359 23.8438C58.0859 24.0781 57.9609 24.4141 57.9609 24.8516C57.9609 25.3359 58.0938 25.9219 58.3594 26.6094L62.9531 38.9609L67.5703 28.9062L66.3516 25.7422C65.9766 24.8047 65.4844 24.1562 64.875 23.7969C64.5312 23.5781 63.8906 23.4453 62.9531 23.3984V22.5312H73.1719V23.3984C72.0469 23.4453 71.25 23.6484 70.7812 24.0078C70.4688 24.2578 70.3125 24.6562 70.3125 25.2031C70.3125 25.5156 70.375 25.8359 70.5 26.1641L75.375 38.4922L79.8984 26.6094C80.2109 25.7656 80.3672 25.0938 80.3672 24.5938C80.3672 24.2969 80.2109 24.0312 79.8984 23.7969C79.6016 23.5625 79.0078 23.4297 78.1172 23.3984V22.5312H84.8906V23.3984C83.5312 23.6016 82.5312 24.5234 81.8906 26.1641L74.7188 44.6562H73.7578L68.3906 30.9453L62.1328 44.6562H61.2656L54.375 26.6094C53.9219 25.4688 53.4766 24.7031 53.0391 24.3125C52.6016 23.9062 51.9141 23.6016 50.9766 23.3984V22.5312Z"
				stroke="#FFBB00"
			/>
			<path
				d="M67.4395 62.9931C66.127 62.3524 65.1192 61.4618 64.4161 60.3212C63.713 59.1649 63.3614 57.8915 63.3614 56.5009C63.3614 54.3759 64.1583 52.5478 65.752 51.0165C67.3614 49.4853 69.4161 48.7196 71.9161 48.7196C73.963 48.7196 75.7364 49.2196 77.2364 50.2196H81.7833C82.4551 50.2196 82.8458 50.2431 82.9551 50.2899C83.0645 50.3212 83.1426 50.3837 83.1895 50.4774C83.2833 50.6181 83.3301 50.8681 83.3301 51.2274C83.3301 51.6337 83.2911 51.9149 83.213 52.0712C83.1661 52.1493 83.0801 52.2118 82.9551 52.2587C82.8458 52.3056 82.4551 52.329 81.7833 52.329H78.9942C79.8692 53.454 80.3067 54.8915 80.3067 56.6415C80.3067 58.6415 79.5411 60.3524 78.0098 61.7743C76.4786 63.1962 74.4239 63.9071 71.8458 63.9071C70.7833 63.9071 69.6973 63.7509 68.588 63.4384C67.9005 64.0321 67.4317 64.5556 67.1817 65.0087C66.9473 65.4462 66.8301 65.8212 66.8301 66.1337C66.8301 66.3993 66.9551 66.6571 67.2051 66.9071C67.4708 67.1571 67.9786 67.3368 68.7286 67.4462C69.1661 67.5087 70.2598 67.5634 72.0098 67.6103C75.2286 67.6884 77.3145 67.7978 78.2676 67.9384C79.7208 68.1415 80.877 68.6806 81.7364 69.5556C82.6114 70.4306 83.0489 71.5087 83.0489 72.7899C83.0489 74.5556 82.2208 76.2118 80.5645 77.7587C78.127 80.0399 74.9473 81.1806 71.0255 81.1806C68.0098 81.1806 65.463 80.5009 63.3848 79.1415C62.213 78.3603 61.627 77.5478 61.627 76.704C61.627 76.329 61.713 75.954 61.8848 75.579C62.1505 75.0009 62.6973 74.1962 63.5255 73.1649C63.6348 73.0243 64.4317 72.1806 65.9161 70.6337C65.1036 70.1493 64.5255 69.7196 64.1817 69.3446C63.8536 68.954 63.6895 68.5165 63.6895 68.0321C63.6895 67.4853 63.9083 66.8446 64.3458 66.1103C64.7989 65.3759 65.8301 64.3368 67.4395 62.9931ZM71.5176 49.8446C70.3614 49.8446 69.3926 50.3056 68.6114 51.2274C67.8301 52.1493 67.4395 53.5634 67.4395 55.4696C67.4395 57.9384 67.9708 59.8524 69.0333 61.2118C69.8458 62.2431 70.877 62.7587 72.127 62.7587C73.3145 62.7587 74.2911 62.3134 75.0567 61.4228C75.8223 60.5321 76.2051 59.1337 76.2051 57.2274C76.2051 54.7431 75.6661 52.7978 74.588 51.3915C73.7911 50.3603 72.7676 49.8446 71.5176 49.8446ZM67.2051 70.8212C66.4708 71.6181 65.9161 72.3603 65.5411 73.0478C65.1661 73.7353 64.9786 74.3681 64.9786 74.9462C64.9786 75.6962 65.4317 76.3524 66.338 76.9149C67.9005 77.8837 70.1583 78.3681 73.1114 78.3681C75.9239 78.3681 77.9942 77.8681 79.3223 76.8681C80.6661 75.8837 81.338 74.829 81.338 73.704C81.338 72.8915 80.9395 72.3134 80.1426 71.9696C79.3301 71.6259 77.7208 71.4228 75.3145 71.3603C71.7989 71.2665 69.0958 71.0868 67.2051 70.8212ZM91.1583 37.4931C91.8145 37.4931 92.3692 37.7274 92.8223 38.1962C93.2911 38.6493 93.5255 39.204 93.5255 39.8603C93.5255 40.5165 93.2911 41.079 92.8223 41.5478C92.3692 42.0165 91.8145 42.2509 91.1583 42.2509C90.502 42.2509 89.9395 42.0165 89.4708 41.5478C89.002 41.079 88.7676 40.5165 88.7676 39.8603C88.7676 39.204 88.9942 38.6493 89.4473 38.1962C89.9161 37.7274 90.4864 37.4931 91.1583 37.4931ZM93.1036 48.7196V65.9696C93.1036 67.3134 93.1973 68.2118 93.3848 68.6649C93.588 69.1024 93.877 69.4306 94.252 69.6493C94.6426 69.8681 95.3458 69.9774 96.3614 69.9774V70.8212H85.9317V69.9774C86.9786 69.9774 87.6817 69.8759 88.0411 69.6728C88.4005 69.4696 88.6817 69.1337 88.8848 68.6649C89.1036 68.1962 89.213 67.2978 89.213 65.9696V57.6962C89.213 55.3681 89.1426 53.8603 89.002 53.1728C88.8926 52.6728 88.7208 52.329 88.4864 52.1415C88.252 51.9384 87.9317 51.8368 87.5255 51.8368C87.088 51.8368 86.5567 51.954 85.9317 52.1884L85.6036 51.3446L92.0723 48.7196H93.1036ZM117.291 62.6649C116.713 65.4931 115.58 67.6728 113.893 69.204C112.205 70.7196 110.338 71.4774 108.291 71.4774C105.854 71.4774 103.729 70.454 101.916 68.4071C100.104 66.3603 99.1973 63.5946 99.1973 60.1103C99.1973 56.7353 100.197 53.9931 102.197 51.8837C104.213 49.7743 106.627 48.7196 109.44 48.7196C111.549 48.7196 113.283 49.2821 114.643 50.4071C116.002 51.5165 116.682 52.6728 116.682 53.8759C116.682 54.4696 116.486 54.954 116.096 55.329C115.721 55.6884 115.19 55.8681 114.502 55.8681C113.58 55.8681 112.885 55.5712 112.416 54.9774C112.15 54.6493 111.971 54.0243 111.877 53.1024C111.799 52.1806 111.486 51.4774 110.94 50.9931C110.393 50.5243 109.635 50.2899 108.666 50.2899C107.104 50.2899 105.846 50.8681 104.893 52.0243C103.627 53.5556 102.994 55.579 102.994 58.0946C102.994 60.6571 103.619 62.9228 104.869 64.8915C106.135 66.8446 107.838 67.8212 109.979 67.8212C111.51 67.8212 112.885 67.2978 114.104 66.2509C114.963 65.5321 115.799 64.2274 116.611 62.3368L117.291 62.6649Z"
				stroke="black"
			/>
		</svg>
	);
}
