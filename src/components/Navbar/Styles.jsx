export const navbarStyles = {
    drawer: {
        
        flexShrink: 10,
        '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#5603AD',
            color: 'white',
        },
        '& .Mui-selected': {
            color: 'red',
        },
    },
    icons: {
        color: 'rgba(255, 255, 255, 0.7)!important',
        marginLeft: '20px',
    },
    text: {
        '& span': {
            marginLeft: '-10px',
            fontWeight: '600',
            fontSize: '16px',
        }
    }
};
export const login = {
    containerStyle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        color: 'black',
    },
    
    formStyle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh',
        gap: '16px',
        color: 'black',
    },
    
    buttonStyle: {
        marginTop: '16px',
        backgroundColor: '#1c4420',
        color: 'white',
    }
};
export const linkStyle = {
    color: 'white'
};

