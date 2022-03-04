import React from "react";

export class SimpleTable extends React.Component {

    render() {
        return (
            <table className="table table-bordered table-datatable table-hover table-striped Contents__table-element">
                <thead>
                    <tr>
                        {Object.keys(contentAttribute).map((item, idx) => <th key={idx}>{contentAttribute[item]}</th>)}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {this.props.content[0] && Object.keys(this.props.content[0]).map((item, idx) => {
                            if (contentAttribute.hasOwnProperty(item)) return <td key={idx}>{this.props.content[0][item]}</td>
                        })}
                    </tr>
                </tbody>
            </table>
        );
    }
}


const contentAttribute = {
    name: "Name",
    createdBy: "Createdby",
    updatedAt: "Lastedited",
    Type: "Type",
    createdAt: "Createddate",
    selected: "status"
}