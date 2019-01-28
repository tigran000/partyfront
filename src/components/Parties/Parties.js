import React, { Fragment } from 'react';
import { Button } from 'antd';

const Parties = ({ partyList, addParty }) => (
    <Fragment>
        {!partyList
            ? <p>You have no party yet!</p> 
            : <ul>
                {partyList.map(party => (
                    <li key={party.id}>
                        <div style={{width: "200px", display: "inline-block"}}>
                            {party.name}
                        </div>
                        <Button icon="edit" />
                        <Button type="danger" icon="delete" />
                    </li>))
                }
            </ul>
        }
        <Button type="primary" onClick={addParty}>Create A Party</Button>
    </Fragment>
);

export default Parties;