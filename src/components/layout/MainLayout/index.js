import React from 'react';
import { makeStyles, useTheme, Divider, List, ListItem, ListItemIcon, ListItemText, CssBaseline, Hidden, Drawer } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import { ReactComponent as IconCup } from "./../../../icons/champion-cup.svg";
import { ReactComponent as IconTeam } from "./../../../icons/teamspeak-brands.svg";
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { allUser, addUser2, userChanges, signout } from './../../services/firebase';
import ListaUsuarios from './../../content/listado/index';
import Perfil from './../../content/Perfil';
import { BrowserRouter, Route, Redirect, Switch, Link } from 'react-router-dom';
import CTorneo from './../../content/Ctorneo';
import { Provider, Consumer } from '../../AuthContext';


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
    container: {
        flexGrow: 1,
        width: '100%'
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
    userInfoCont: {
        backgroundColor: '#106cc8',
        height: '64px',
        width: '100%',
        textAlign: 'center',
        display: 'table',
        position: 'absolute'
    },
    drawerPaper: {
        width: drawerWidth,
        borderRight: '1px solid rgb(0, 0, 0)',
    },
    content: {
        flexGrow: 1,
        width:'100%',
        padding: theme.spacing(3)
    },
    icon: {
        color: 'black',
        width: '30px',
        height: '30px'
    },
    userName: {
        display: 'table-cell',
        verticalAlign: 'middle',
        color: 'white',

    }

}));

function MainLayout(props) {


    const signOut = (evt, setAuth) => {
        setAuth(false);
        sessionStorage.clear();
        signout();
    }
    const { container } = props;
    const classes = myStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [show, setShow] = React.useState('listar');
    const example = () => {
        addUser2().then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    }
    function changeShow(show) {
        switch (show) {
            case 'Mis torneos':
                return <ListaUsuarios />
                break;
            case 'Editar perfil':
                return <Perfil />
                break;
            case 'Crear Torneo':
                return <CTorneo />
                break;
            default:
                return <ListaUsuarios />
                break;
        }
    }
    /*userChanges().onAuthStateChanged(function (user) {
        console.log(user.uid)
    });*/


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
                <ListItem button key={"Mis Torneos"} value={'Mis Torneos'} onClick={event => setShow(event.currentTarget.getAttribute('value'))}>
                    <ListItemIcon>
                        <IconCup height="30px" width="30px" fill="black" />
                    </ListItemIcon>
                    <ListItemText primary="Mis Torneos" />
                </ListItem>
                <ListItem button key={'Mis Equipos'} value={'Mis Equipos'} onClick={event => setShow(event.currentTarget.getAttribute('value'))}>
                    <ListItemIcon>
                        <IconTeam height="30px" width="30px" fill="black" />
                    </ListItemIcon>
                    <ListItemText primary="Mis Equipos" />
                </ListItem>
                <ListItem button key={"Crear Torneo"} value={'Crear Torneo'} onClick={event => setShow(event.currentTarget.getAttribute('value'))}>
                    <ListItemIcon>
                        <CreateOutlinedIcon className={classes.icon} />
                    </ListItemIcon>
                    <ListItemText primary="Crear Torneo" />
                </ListItem>
                <ListItem button key={"Editar perfil"} value={'Editar perfil'} onClick={event => setShow(event.currentTarget.getAttribute('value'))}>
                    <ListItemIcon>
                        <SettingsIcon className={classes.icon} />
                    </ListItemIcon>
                    <ListItemText primary="Editar Perfil" />
                </ListItem>
                <ListItem button key={"Cerrar sesión"}>
                    <ListItemIcon>
                        <ExitToAppIcon className={classes.icon} />
                    </ListItemIcon>
                    <ListItemText primary="Cerrar sesión" onClick={signout} />
                </ListItem>
            </List>
        </div>
    );

    return (
        <Consumer>
            {({ setAuth }) => (
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
                                <div>

                                    <div className={classes.toolbar} >
                                        <div className={classes.userInfoCont}>
                                            <Typography subtitle1 className={classes.userName}>
                                                Username
                                            </Typography>
                                        </div>
                                    </div>
                                    <List>

                                        <ListItem button key={"Mis Torneos"} value={'Mis Torneos'} onClick={event => setShow(event.currentTarget.getAttribute('value'))}>
                                            <ListItemIcon>
                                                <IconCup height="30px" width="30px" fill="black" />
                                            </ListItemIcon>
                                            <ListItemText primary="Mis Torneos" />
                                        </ListItem>
                                        <ListItem button key={'Mis Equipos'} value={'Mis Equipos'} onClick={event => setShow(event.currentTarget.getAttribute('value'))}>
                                            <ListItemIcon>
                                                <IconTeam height="30px" width="30px" fill="black" />
                                            </ListItemIcon>
                                            <ListItemText primary="Mis Equipos" />
                                        </ListItem>
                                        <ListItem button key={"Crear Torneo"} value={'Crear Torneo'} onClick={event => setShow(event.currentTarget.getAttribute('value'))}>
                                            <ListItemIcon>
                                                <CreateOutlinedIcon className={classes.icon} />
                                            </ListItemIcon>
                                            <ListItemText primary="Crear Torneo" />
                                        </ListItem>
                                        <ListItem button key={"Editar perfil"} value={'Editar perfil'} onClick={event => setShow(event.currentTarget.getAttribute('value'))}>
                                            <ListItemIcon>
                                                <SettingsIcon className={classes.icon} />
                                            </ListItemIcon>
                                            <ListItemText primary="Editar Perfil" />
                                        </ListItem>
                                        <ListItem button key={"Cerrar sesión"}>
                                            <ListItemIcon>
                                                <ExitToAppIcon className={classes.icon} />
                                            </ListItemIcon>
                                            <ListItemText primary="Cerrar sesión" onClick={e => signOut(e, setAuth)} />
                                        </ListItem>
                                    </List>
                                </div>
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
                                        <ListItem button key={"Mis Torneos"} value={'Mis Torneos'} onClick={event => setShow(event.currentTarget.getAttribute('value'))}>
                                            <ListItemIcon>
                                                <IconCup height="30px" width="30px" fill="black" />
                                            </ListItemIcon>
                                            <ListItemText primary="Mis Torneos" />
                                        </ListItem>
                                        <ListItem button key={'Mis Equipos'} value={'Mis Equipos'} onClick={event => setShow(event.currentTarget.getAttribute('value'))}>
                                            <ListItemIcon>
                                                <IconTeam height="30px" width="30px" fill="black" />
                                            </ListItemIcon>
                                            <ListItemText primary="Mis Equipos" />
                                        </ListItem>
                                        <ListItem button key={"Crear Torneo"} value={'Crear Torneo'} onClick={event => setShow(event.currentTarget.getAttribute('value'))}>
                                            <ListItemIcon>
                                                <CreateOutlinedIcon className={classes.icon} />
                                            </ListItemIcon>
                                            <ListItemText primary="Crear Torneo" />
                                        </ListItem>
                                        <ListItem button key={"Editar perfil"} value={'Editar perfil'} onClick={event => setShow(event.currentTarget.getAttribute('value'))}>
                                            <ListItemIcon>
                                                <SettingsIcon className={classes.icon} />
                                            </ListItemIcon>
                                            <ListItemText primary="Editar Perfil" />
                                        </ListItem>
                                        <ListItem button key={"Cerrar sesión"}>
                                            <ListItemIcon>
                                                <ExitToAppIcon className={classes.icon} />
                                            </ListItemIcon>
                                            <ListItemText primary="Cerrar sesión" onClick={e => signOut(e, setAuth)} />
                                        </ListItem>
                                    </List>
                                </div>
                            </Drawer>
                        </Hidden>
                    </nav>
                    <main className={classes.content}>
                        <div className={classes.toolbar} />

                        {
                            changeShow(show)
                        }
                        {/*<ListaUsuarios />
                <Perfil/>
                */}
                        {/* <button onClick={addUser2}>Cambiar</button> */}
                    </main>
                </div>
            )}
        </Consumer>
    );
}

export default MainLayout;
