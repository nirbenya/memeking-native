// menu icons

import dankIcon from './icons/dank-icon.jpg';
import popIcon from './icons/pop-icon.jpg';
import israeliIcon from './icons/israeli-icon.jpg';
import animalsIcon from './icons/animals-icon.jpg';
import eretzIcon from './icons/eretz_nehederet-icon.jpg';
import jewsIcon from './icons/jews-icon.jpg';
import mashupsIcon from './icons/mashups-icon.jpg';
import asiguriIcon from './icons/asi_guri-icon.jpg';
import classicIcon from './icons/classic-icon.jpg';
import parlamentIcon from './icons/parlament-icon.jpg';
import hazarot from './icons/nina.png';
import standupIcon from './icons/standup-icon.jpg';
import tvAbroadIcon from './icons/tv_abroad-icon.jpg';
import commercialsIcon from './icons/commercials-icon.jpg';
import generalIcon from './icons/general-icon.jpg';
import goalstarIcon from './icons/goalstar-icon.jpg';
import israeliTvIcon from './icons/israeli_tv-icon.jpg';
import mediaIcon from './icons/media-icon.jpg';
import kupa from './icons/kupa.jpg';

const menu = {
	dank: {
		title: 'דאנק מימז',
		icon: dankIcon,
		path: `/memes/dank`,
		visible: true,
		name: 'dank',
	},

	israeli: {
		title: 'ממים ישראליים',
		icon: israeliIcon,
		path: `/memes/israeli`,
		visible: true,
		isIsraeli: true,
		name: 'israeli',
	},

	pop: {
		title: 'תרבות הפופ',
		icon: popIcon,
		path: `/memes/pop`,
		visible: true,
		name: 'pop',
	},

	parlament: {
		title: 'הפרלמנט',
		icon: parlamentIcon,
		path: `/memes/parlament`,
		visible: true,
		isIsraeli: true,
		name: 'parlament',
	},

	classic: {
		title: 'ממים קלאסיים',
		icon: classicIcon,
		path: `/memes/classic`,
		visible: true,
		name: 'classic',
	},

	general: {
		title: 'כללי',
		icon: generalIcon,
		path: `/memes/general`,
		visible: true,
		name: 'general',
	},

	eretz_nehederet: {
		title: 'ארץ נהדרת',
		icon: eretzIcon,
		path: `/memes/eretz_nehederet`,
		visible: true,
		isIsraeli: true,
		name: 'eretz_nehederet',
	},

	tv_abroad: {
		title: 'תכניות טלויזיה',
		icon: tvAbroadIcon,
		path: `/memes/tv_abroad`,
		visible: true,
		name: 'tv_abroad',
	},

	mashups: {
		title: 'מאשאפים',
		icon: mashupsIcon,
		path: `/memes/mashups`,
		visible: true,
		name: 'mashups',
	},

	standup: {
		title: 'סטנדאפ',
		icon: standupIcon,
		path: `/memes/standup`,
		visible: true,
		isIsraeli: true,
		name: 'standup',
	},

	goalstar: {
		title: 'גולסטאר',
		icon: goalstarIcon,
		path: `/memes/goalstar`,
		visible: true,
		isIsraeli: true,
		name: 'goalstar',
	},

	israeli_tv: {
		title: 'סדרות ישראליות',
		icon: israeliTvIcon,
		path: `/memes/israeli_tv`,
		visible: true,
		isIsraeli: true,
		name: 'israeli_tv',
	},

	animals: {
		title: 'חיות',
		icon: animalsIcon,
		path: `/memes/animals`,
		visible: true,
		name: 'animals',
	},
	commercials: {
		title: 'פרסומות',
		icon: commercialsIcon,
		path: `/memes/commercials`,
		visible: true,
		isIsraeli: true,
		name: 'commercials',
	},

	asi_guri: {
		title: 'אסי וגורי',
		icon: asiguriIcon,
		path: `/memes/asi_guri`,
		visible: true,
		isIsraeli: true,
		name: 'asi_guri',
	},

	media: {
		title: 'מדיה',
		icon: mediaIcon,
		path: `/memes/media`,
		visible: true,
		name: 'media',
	},

	jews: {
		title: 'היהודים באים',
		icon: jewsIcon,
		path: `/memes/jews`,
		visible: true,
		isIsraeli: true,
		name: 'jews',
	},
	kupa: {
		title: 'קופה ראשית',
		icon: kupa,
		visible: true,
		name: 'kupa',
	},
	hazarot: {
		title: 'חזרות',
		icon: hazarot,
		visible: true,
		name: 'hazarot',
	},
};

export default menu;
