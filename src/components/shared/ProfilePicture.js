import React from "react";
import { useProfilePictureStyles } from "../../styles";
import { Person } from "@material-ui/icons";
function ProfilePicture({ 
  size, 
  image = 'https://vignette.wikia.nocookie.net/sluzacza/images/9/90/Serious-sam-bomb-logo.png/revision/latest?cb=20130916142330&path-prefix=pl' , 
  isOwner 
}) {
  const classes = useProfilePictureStyles({ size, isOwner });

  return (
    <section className={classes.section}>
      { image ? (
        <div className={classes.wrapper}>
          <img src={image} alt="user profile" className={classes.image}/>
        </div>
      ) : (
       
        <div className={classes.wrapper}>
          <Person className={classes.person}/>
        </div>
      )}
    </section>
  )
}

export default ProfilePicture;
