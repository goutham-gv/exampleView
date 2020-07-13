import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
	DetailsList,
	SelectionMode,
} from "@fluentui/react";
import { Nav, INavLink, INavStyles, INavLinkGroup } from 'office-ui-fabric-react/lib/Nav';
import { IStackTokens,IStackProps, Stack } from 'office-ui-fabric-react/lib/Stack';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
};
const navStyles: Partial<INavStyles> = {
  root: {
    width: 80,
    height: 750,
    boxSizing: 'border-box',
    borderRight: '1px solid #eee',
    backgroundColor:'#eefdfc',
    overflow: 'auto',
  },
};

export interface IExampleOptions {
  horizontalAlignment: IStackProps['horizontalAlign'];
}
const options: IDropdownOption[] = [
  { key: 'Alphaheader', text: 'Alphabets', itemType: DropdownMenuItemType.Header },
  { key: 'A', text: 'A' },
  { key: 'B', text: 'B' },
  { key: 'C', text: 'C', disabled: true },
  { key: 'D', text: 'D' },
  { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
  { key: 'NumHeader', text: 'Numbers', itemType: DropdownMenuItemType.Header },
  { key: '1', text: '1' },
  { key: '2', text: '2' },
  { key: '3', text: '3' },
];

const navLinkGroups: INavLinkGroup[] = [
  {
    links: [
      {
        name: '@',
        url: '',
        expandAriaLabel: 'Expand Home section',
        collapseAriaLabel: 'Collapse Home section',
      },
      {
        name: '#',
        url: '',
        key: 'key3',
        isExpanded: true,
        target: '_blank',
      },
      {
        name: '&',
        url: '',
        key: 'key4',
        target: '_blank',
      },
    ],
  },
];
const Side: React.FunctionComponent = () => {
  return (
    <Nav
      onLinkClick={_onLinkClick}
      selectedKey="key1"
      styles={navStyles}
      groups={navLinkGroups}
    />
  );
};

class MainPage extends React.Component {

  state = {
    isLoading: true,
    users: [],
    error: null
  };


  fetchUsers() {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          users: data,
          isLoading: false,
        })
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.fetchUsers();
  }

  render() {

    const { isLoading, users, error } = this.state;


    const columns = [
      {
        key: "tickets",
        fieldName: "ticketNumber",
        name: "Ticket",
        minWidth: 100,
        maxWidth: 200,
        isResizable: true,
      },
      {
        key: "status",
        fieldName: "status",
        name: "Status",
        minWidth: 100,
        maxWidth: 200,
        isResizable: true,
      },
      {
        key: "employee",
        fieldName: "employee",
        name: "Employee",
        minWidth: 100,
        maxWidth: 200,
        isResizable: true,
      },
    ];
    return (
      <div className="container">
				<div className="title">Tickets</div>
				<div className="content">
        <Stack horizontal gap={10} padding={20}>
      <Dropdown
        placeholder="Select an option"
        label="FAMILY"
        options={options}
        className="dropdown"
      />
      <Dropdown
        placeholder="Select an option"
        label="MACHINES"
        options={options}
        className="dropdown"
      />
       <Dropdown
        placeholder="Select an option"
        label="STATUS"
        options={options}
        className="dropdown"
      />
      <button style={{
		marginTop: "10px",
                marginLeft: "8px",
                height:"30px",
                width: "80px",
                
  }}>FIND</button>
    </Stack>
    </div>
 <div className="tickets">  
<DetailsList
items={columns}
columns={columns}
selectionMode={SelectionMode.none}
/>
</div>
            <React.Fragment>
        <h1>API CALL</h1>
        {!isLoading ? (
          users.map(user => {
            const { username, name, id } = user;
            return (
              <div key={username}>
                <p>ID: {id}</p>
                <p>Name: {name}</p>
                <hr />
              </div>
            );
          })
        ) : (
            <h3>Loading...</h3>
          )}
      </React.Fragment>
    </div>
    );
  }
}



const stackTokens: IStackTokens = {childrenGap : 20};
const stackProps: IStackProps ={horizontal:true};

function App() {
  return (
    <div>
    <Nav
    onLinkClick={_onLinkClick}
    selectedKey="key3"
    styles={navStyles}
    groups={navLinkGroups}
  />
  <MainPage />
  </div>
);
}

function _onLinkClick(ev?: React.MouseEvent<HTMLElement>, item?: INavLink) {
  if (item && item.name === 'News') {
    alert('News link clicked');
  }
}

export default App;
