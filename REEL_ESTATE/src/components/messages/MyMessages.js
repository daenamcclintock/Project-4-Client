import React, { useState, useEffect } from "react";
import ShowMessages from 'ShowMessages'
import CreateMessage from 'CreateMessage'




let messages
    
if(user) {
    if(user.messages.length > 0){
        messages = user.messages.map(message=> (
            <ShowMessage key={message._id} updated={updated} message={message} property={property} user={user}
            triggerRefresh={()=> setUpdated(prev=> !prev)}
            />
        ))
    }
}