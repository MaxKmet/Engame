import React from 'react';

import UpperContent from './UpperContent'
import Album from './Album';

const MainPageContent = ({ classes, cards }) => (
    <div>
<UpperContent classes={classes}/>
    <Album classes = {classes} cards = {cards}>
    </Album>
    </div>
    );
    
export default MainPageContent;