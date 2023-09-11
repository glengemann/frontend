import {
    faHome,
    faEye,
    faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';

const iconMap = [
    faHome,
    faEye,
    faEyeSlash,
].reduce((map, obj) => {
    return {...map, [obj.iconName]: obj};
}, {});

export default iconMap;
