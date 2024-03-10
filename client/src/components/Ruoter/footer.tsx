
import * as React from 'react';
import { Footer } from 'antd/es/layout/layout';
import { Blog } from '../User/blog';
import './footer.css';
const Footers: React.FC = () => {

    return (
        <Footer id="main-footer" className='footer'>
            <div className="social">
                <Blog />
            </div>
            <p className='Copyright'>Copyright &copy; 2024. All Rights Reserved</p>
        </Footer>
    );
}

export default Footers;