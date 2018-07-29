import App from '../src/App';
import {shallow} from 'enzyme';

describe('App Component',()=>{
    const mountedComponent =  shallow(<App/>);
    
    it('Match Snapshot',()=>{
        expect(mountedComponent).toMatchSnapshot();
    });
})