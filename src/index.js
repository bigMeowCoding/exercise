// eslint-disable-next-line no-unused-vars
import styles from './styles/index.less';
import _ from 'lodash';
import render from './render';

function getLodash() {
    // return  import('lodash'
    //      ).then(() => {
    const div = document.createElement('div');
    div.innerText = _.join([1, 4, 3], '**');
    return div
    // })
}

const btn = document.getElementById('loadButton');
btn.addEventListener('click', () => {
    document.body.appendChild(getLodash());
}, false);
const renderbtn = document.getElementById('render');
renderbtn.addEventListener('click', () => {
    render();

}, false);
