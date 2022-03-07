import React from "react";

class ExpandCollapse extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            values: {
                name: ''
            }
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // if (this.state.values.name)
            this.props.runOnFilterData(this.state.values.name);
    };

    handleInputChange = (event) => {
        this.setState({
            values: { [event.target.name]: event.target.value },
        });
    };

    onClick = () => {
        this.setState({ open: !this.state.open })
    }

    handleKeyDown() {

    }

    render() {
        return (
            <div
                className="ContentsFilter well"
                role="button"
                tabIndex={0}
                style={{ margin: '1rem 0rem' }}
            >
                <form onSubmit={this.handleSubmit}>
                    <div style={{ display: 'flex', margin: '1rem 0rem' }}>
                        <button id="dropdown-example" role="button" aria-haspopup="true" aria-expanded="false" type="button" className="dropdown-toggle btn btn-default">Name <span className="caret"></span></button>
                        <input
                            type="search"
                            name="name"
                            value={this.state.values.name}
                            onChange={this.handleInputChange}
                            role="combobox"
                            className="rbt-input-main form-control rbt-input"
                            placeholder="Search Content"
                        />
                    </div>
                    <div className="pull-right mbt10">
                        <button className="btn btn-primary">Search</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default ExpandCollapse;

// <span className={`icon fa fa-chevron-${true ? 'down' : 'right'} CollapsibleSection__title-collapse-button`} />