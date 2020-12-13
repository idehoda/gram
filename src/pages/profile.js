import React from "react";
import { useProfilePageStyles } from "../styles";
import Layout from '../components/shared/Layout';
import { defaultCurrentUser } from '../data';
import { Avatar, Divider, Button, Hidden, Card, CardContent, Typography, Dialog, Zoom, DialogTitle } from '@material-ui/core';
import { GearIcon } from '../icons';
import ProfilePicture from '../components/shared/ProfilePicture';
import { Link } from 'react-router-dom';
import ProfileTabs from '../components/profile/ProfileTabs';

function ProfilePage() {
  const classes = useProfilePageStyles();
  const [ showOptionsMenu, setOptionsMenu ] = React.useState(false);
  const isOwner = true;

  function handleCloseMenu() {
    setOptionsMenu(false);
  }

  function handleOptionsMenuClick() {
    setOptionsMenu(true)
  }

  return <Layout 
    title={`${defaultCurrentUser.name} @${defaultCurrentUser.username}`}
    >
      <div className={classes.container}>
        <Hidden xsDown>
          <Card className={classes.cardLarge}>
            <ProfilePicture isOwner={isOwner} />
            <CardContent className={classes.cardContentLarge}>
              <ProfileNameSection
                handleOptionsMenuClick={handleOptionsMenuClick}
                isOwner={isOwner}
                user={defaultCurrentUser}
              />
              <PostCountSection user={defaultCurrentUser}/>
              <NameBioSection user={defaultCurrentUser}/>
            </CardContent>
          </Card>
        </Hidden>
        <Hidden smUp>
          <Card className={classes.cardSmall}>
            <CardContent>
              <section className={classes.sectionSmall}>
                <ProfilePicture size={77} isOwner={isOwner} />
                <ProfileNameSection
                  handleOptionsMenuClick={handleOptionsMenuClick}  
                  isOwner={isOwner}
                  user={defaultCurrentUser}
                />
              </section>
              <NameBioSection user={defaultCurrentUser}/>
            </CardContent>
            <PostCountSection user={defaultCurrentUser}/>
          </Card>
        </Hidden>
        { showOptionsMenu && <OptionsMenu handleCloseMenu={handleCloseMenu}/>}
        <ProfileTabs user={defaultCurrentUser} isOwner={isOwner}/>
      </div>
    </Layout>
}

function ProfileNameSection({ user, isOwner, handleOptionsMenuClick }) {
  const classes = useProfilePageStyles();
  const [ showUnfollowDialog, setUnfollowDialog ] = React.useState(false);
  
  let followButton;
  const isFollowing = true;
  const isFollower = false;

  if (isFollowing) {
    followButton = (
      <Button variant="outlined" className={classes.button} onClick={() => setUnfollowDialog(true)}>
        Following
      </Button>
    )
  } else if (isFollower) {
    followButton = (
      <Button variant="contained" color="primary" className={classes.button}>
        Follow Back
      </Button>
    )
  } else {
    followButton = (
      <Button variant="contained" color="primary" className={classes.button}>
        Follow
      </Button>
    )
  }

  return (
    <>
      <Hidden xsDown>
        <section className={classes.usernameSection}>
          <Typography className={classes.username}>
            {user.username}
          </Typography>
          {isOwner ? (
            <>
            <Link to="/accounts/edit">
                <Button variant="outlined">Edit Profile</Button>
            </Link>
            <div onClick={handleOptionsMenuClick} className={classes.settingsWrapper}>
              <GearIcon className={classes.settings}/>
            </div>
            </>
          ) : (
            <>{followButton}</>
          )}
        </section>
      </Hidden>
      <Hidden smUp>
        <section>
          <div className={classes.usernameDivSmall}>
            <Typography className={classes.username}>
              {user.username}
            </Typography>
            {isOwner && (
              <div onClick={handleOptionsMenuClick} className={classes.settingsWrapper}>
                <GearIcon className={classes.settings} />
              </div>
            )}
          </div>
          {isOwner ? (
            <Link to="/accounts/edit">
              <Button variant="outlined" style={{ width: "100%" }}>Edit Profile</Button>
            </Link>
          ) : (
            followButton
          )}
        </section>
      </Hidden>
      { showUnfollowDialog && <UnfollowDialog user={user} onClose={() => setUnfollowDialog(false)} />}
    </>
  )
}

function UnfollowDialog({ user, onClose }) {
  const classes = useProfilePageStyles();
  return (
    <Dialog 
      open
      classes={{
        scrollPaper: classes.unfollowDialogScrollPaper
      }}
      onClose={onClose}
      TransitionComponent={Zoom}
    >
      <div className={classes.wrapper}>
        <Avatar 
          src={user.profile_image}
          alt={`${user.username}'s avatar`}
          className={classes.avatar}
        />
      </div>
      <Typography align="center" variant="body2" className={classes.unfollowDialogText}>
        Unfollow @{user.username}?
      </Typography>
      <Divider />
      <Button className={classes.unfollowButton}>
        Unfollow
      </Button>
      <Divider />
      <Button className={classes.cancelButton} onClick={onClose}>
        Cancel
      </Button>
    </Dialog>
  )
}

function PostCountSection({ user }) {
  const classes = useProfilePageStyles();
  const options = ["posts", "followers", "following"];
  return  (
    <>
      <Hidden smUp>
        <Divider />
      </Hidden>
      <section className={classes.followingSection}>
        {options.map(option => (
          <div key={option} className={classes.followingText}>
            <Typography className={classes.followingCount}>
              {user[option].length}
            </Typography>
            <Hidden xsDown>
              <Typography>{option}</Typography>
            </Hidden>
            <Hidden smUp>
              <Typography color="textSecondary">{option}</Typography>
            </Hidden>
          </div>
        ))}
      </section>
      <Hidden smUp>
        <Divider />
      </Hidden>
    </>
  )
}
function NameBioSection({ user }) {
  const classes = useProfilePageStyles();
  return (
    <section className={classes.section}>
      <Typography className={classes.typography}>{user.name}</Typography>
      <Typography>{user.bio}</Typography>
      <a href={user.website} target="_blank" rel="noopener noreferrer">
        <Typography color="secondary" className={classes.typography}>{user.website}</Typography>
      </a>
    </section>
  )
}
function OptionsMenu({ handleCloseMenu }) {
  const classes = useProfilePageStyles();
  const [ showLogoutMessage, setLogoutMessage ] = React.useState(false);

  function handleLogoutClick() {
    setLogoutMessage(true);
  }

  return (
    <Dialog 
      open 
      classes={{ 
        scrollPaper: classes.dialogScrollPaper,
        paper: classes.gialogPaper
      }}
      TransitionComponent={Zoom}
    >
      { showLogoutMessage ? (
        <DialogTitle className={classes.dialogTitle}>
          Logging Out
          <Typography color="textSecondary">
            You need to lof back in to continue using instagram
          </Typography>
        </DialogTitle>
      ) : (
        <>
          <OptionsItem text="Change Password"/>
          <OptionsItem text="Nametag"/>
          <OptionsItem text="Authorized Apps"/>
          <OptionsItem text="Notifications"/>
          <OptionsItem text="Privacy and Security"/>
          <OptionsItem text="Log Out" onClick={handleLogoutClick}/>
          <OptionsItem text="Cancel" onClick={handleCloseMenu}/>
        </>
      )}
    </Dialog>
  )
}

function OptionsItem({ text, onClick }) {
  return (
    <>
      <Button style={{ padding: '12px 8px'}} onClick={onClick}>
        {text}
      </Button>
      <Divider />
    </>
  )
}

export default ProfilePage;
