import { useState } from 'react';
import data from './data'
import './styles.css'

export default function Accordion() {

    const [selected, setSelected] = useState(null);
    const [enableMultiSelect, setEnableMultiSelect] = useState(false);
    const [multiSelected, setMultiSelected] = useState([])
    

    function handleSingleSelection(getCurrentId) {
        console.log(`handleSingleSelection(${getCurrentId})`)
        if (enableMultiSelect) {
            if (multiSelected.indexOf(getCurrentId) > -1) {
                console.log(`Before : ${multiSelected}`)
                console.log(`indexOf: ${multiSelected.indexOf(getCurrentId)}`)
                console.log(`Splice : ${multiSelected.splice(multiSelected.indexOf(getCurrentId), 1)}`)
                setMultiSelected(multiSelected.splice(multiSelected.indexOf(getCurrentId), 1))
                // setMultiSelected(multiSelected. .delete(getCurrentId))
                
            } else {
                // setMultiSelected(multiSelected.add(getCurrentId))
                setMultiSelected(multiSelected.concat(getCurrentId))
            }
        } else {
            setSelected(selected === getCurrentId ? null : getCurrentId)
        }
    }

    function toggleMultiSelect() {
        // If enabling multi-select Carry over single open item,
        // Otherwise collapse all but first selected item
        if (!enableMultiSelect) {
            setMultiSelected([].concat(selected))
        } else {
            setSelected(multiSelected.sort()[0] || null)
        }

        setEnableMultiSelect(!enableMultiSelect)
    }

    function isOpen(itemId) {
        if (enableMultiSelect) {
            return multiSelected.indexOf(itemId) > -1
        } else {
            return itemId === selected;
        }
    }
    
    console.log(selected, enableMultiSelect, multiSelected)

    return <div className="wrapper">
        <button onClick={ () => toggleMultiSelect() }>Enable multi-selection</button>
        <div className="accordian">
            {
                data && data.length > 0 ? 
                    data.map(dataItem => 
                        <div className="item">
                            <div onClick={ () => handleSingleSelection(dataItem.id)} className="title">
                            <h3>{dataItem.question}</h3>
                            { selected === dataItem.id ? <span>-</span> : <span>+</span> }
                        </div>
                        {
                            // selected === dataItem.id ? 
                            isOpen(dataItem.id) ? 
                            <div className="content">{dataItem.answer}</div>
                            : null
                        }
                </div>)
                : <div>No data found</div>

            }
        </div>
    </div>;
}

