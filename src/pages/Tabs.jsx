import React, { useState } from 'react'
import Tab1 from '../components/Tab1';
import Tab2 from '../components/Tab2';

function Tabs() {

    const [seletedTab, setSeletedTab] = useState(0);
    const changeTab = (tabnumber) => {
        setSeletedTab(tabnumber);
    }
    return (
        <div>
            <div className='my-4 flex justify-around'>
                <div className='text-center' onClick={(e) => { changeTab(0) }} >
                    <div><span>MAP</span></div>
                    <div className='w-10 h-1 bg-black'></div>
                </div>
                <div onClick={(e) => { changeTab(1) }}>
                    <div><span>DATA</span></div>
                    <div className='w-10 h-1 bg-black'></div>
                </div>
            </div>
            {seletedTab === 0 && <Tab1 />}
            {seletedTab === 1 && <Tab2 />}
        </div>
    )
}

export default Tabs