import React from 'react';
import { makeStyles, useTheme, Divider, List, ListItem, ListItemIcon, ListItemText, CssBaseline, Hidden, Drawer } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import {ReactComponent as IconCup} from "./../../../icons/champion-cup.svg";
import {ReactComponent as IconTeam} from "./../../../icons/teamspeak-brands.svg";
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {allUser} from './../../services/firebase';


const drawerWidth = 240;
const myStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0,
        },
        
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`
        }
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            display: "none"
        }
    },
    toolbar: theme.mixins.toolbar,
    userInfoCont:{
        backgroundColor: '#106cc8',
        height: '64px',
        width:'100%',
        textAlign: 'center',
        display: 'table',
        position: 'absolute'
    },
    drawerPaper: {
        width: drawerWidth,
        borderRight :'1px solid rgb(0, 0, 0)',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
    icon:{
        color: 'black',
        width : '30px',
        height: '30px'
    },
    userName:{
        display: 'table-cell',
        verticalAlign: 'middle',
        color: 'white',
        
    }

}));



function MainLayout(props) {
    const signout = () => {
        props.setAuthentication(false);
    }
    const { container } = props;
    const classes = myStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    allUser().then(function (res) {
        res.forEach(function (doc) {
            console.log(doc.id, '->', doc.data().nombre, ' - ', doc.data().correo);

        });
    });;  
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            
            <div className={classes.toolbar} >
                <div className={classes.userInfoCont}>
                    <Typography subtitle1 className={classes.userName}>
                    Username
                    </Typography>
                </div>
            </div>
            
            
            <List>
                {/**
                {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
                 */}
                <ListItem button key={"Mis Torneos"}>
                    <ListItemIcon>
                        <IconCup height="30px" width="30px" fill="black"/>
                    </ListItemIcon>
                    <ListItemText primary="Mis Torneos" />
                </ListItem>
                <ListItem button key={"Mis Equipos"}>
                    <ListItemIcon>
                        <IconTeam height="30px" width="30px" fill="black" />
                    </ListItemIcon>
                    <ListItemText primary="Mis Equipos" />
                </ListItem>
                <ListItem button key={"Crear Torneo"}>
                    <ListItemIcon>
                        <CreateOutlinedIcon className={classes.icon}/>
                    </ListItemIcon>
                    <ListItemText primary="Crear Torneo" />
                </ListItem>
                <ListItem button key={"Editar perfil"}>
                    <ListItemIcon>
                        <SettingsIcon className={classes.icon}/>
                    </ListItemIcon>
                    <ListItemText primary="Editar Perfil" />
                </ListItem>
                <ListItem button key={"Cerrar sesión"}>
                    <ListItemIcon>
                        <ExitToAppIcon className={classes.icon}/>
                    </ListItemIcon>
                    <ListItemText primary="Cerrar sesión" onClick={signout} />
                </ListItem>
            </List>
        </div>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Responsive drawer
            </Typography>
                </Toolbar>
            </AppBar>

            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === "rtl" ? "right" : "left"}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper
                        }}
                        ModalProps={{
                            keepMounted: true // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
                    dolor purus non enim praesent elementum facilisis leo vel. Risus at
                    ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
                    quisque non tellus. Convallis convallis tellus id interdum velit
                    laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
                    adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
                    integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
                    eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
                    quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
                    vivamus at augue. At augue eget arcu dictum varius duis at consectetur
                    lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
                    faucibus et molestie ac.
        </Typography>
                <Typography paragraph>
                    Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
                    ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
                    elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
                    sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
                    mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
                    risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
                    purus viverra accumsan in. In hendrerit gravida rutrum quisque non
                    tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
                    morbi tristique senectus et. Adipiscing elit duis tristique
                    sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                    eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
                    posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
                <p>Hola mundo</p>
                 
                
                    

                 
                           
                                   
                              
                <button onClick={signout}>Logout</button>
            </main>
        </div>
    );
}

export default MainLayout;