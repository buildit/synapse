import React, { Component, PropTypes } from 'react';
import Input from '../1-atoms/Input';
import DateInput from '../1-atoms/DateInput';
import EditableFlowTable from '../2-molecules/EditableFlowTable';
import EditableRoleTable from '../2-molecules/EditableRoleTable';
import EditableSeverityTable from '../2-molecules/EditableSeverityTable';
import AddFlowItem from '../2-molecules/AddFlowItem';
import AddRoleItem from '../2-molecules/AddRoleItem';
import AddSeverityItem from '../2-molecules/AddSeverityItem';

class EditProject extends Component {
  componentWillMount() {
    this.props.initializeFormData(this.props.project);
  }

  render() {
    const onInputChange = this.props.onInputChange;
    const project = this.props.project;
    const onListItemRemove = this.props.onListItemRemove;
    const addItemToDemandFlowList = this.props.addItemToDemandFlowList;
    const addItemToDefectFlowList = this.props.addItemToDefectFlowList;
    const addItemToRoleList = this.props.addItemToRoleList;
    const addItemToSeverityList = this.props.addItemToSeverityList;
    return (
      <form>
        <h1>{project.name}</h1>
        <Input
          label="ID"
          section="header"
          property="id"
          onInputChange={onInputChange}
          initialValue={project.id}
        />
        <Input
          label="Name"
          section="header"
          property="name"
          onInputChange={onInputChange}
          initialValue={project.name}
        />
        <Input
          label="Program"
          section="header"
          property="program"
          onInputChange={onInputChange}
          initialValue={project.program}
        />
        <Input
          label="Portfolio"
          section="header"
          property="portfolio"
          onInputChange={onInputChange}
          initialValue={project.portfolio}
        />
        <Input
          label="Status"
          section="header"
          property="status"
          onInputChange={onInputChange}
          initialValue={project.status}
        />
        <Input
          label="Description"
          section="header"
          property="description"
          onInputChange={onInputChange}
          initialValue={project.description}
        />
        <DateInput
          label="Start date"
          section="header"
          property="startDate"
          onInputChange={onInputChange}
          initialValue={project.startDate}
        />
        <DateInput
          label="End date"
          section="header"
          property="endDate"
          onInputChange={onInputChange}
          initialValue={project.endDate}
        />
        <Input
          label="Phase"
          section="header"
          property="phase"
          onInputChange={onInputChange}
          initialValue={project.phase}
        />

        <h2>Demand</h2>
        <Input
          label="Demand source"
          section="demand"
          property="source"
          onInputChange={onInputChange}
          initialValue={project.demand.source}
        />
        <Input
          label="Demand source URL"
          section="demand"
          property="url"
          onInputChange={onInputChange}
          initialValue={project.demand.url}
        />
        <Input
          label="Demand project"
          section="demand"
          property="project"
          onInputChange={onInputChange}
          initialValue={project.demand.project}
        />
        <Input
          label="Demand auth policy"
          section="demand"
          property="authPolicy"
          onInputChange={onInputChange}
          initialValue={project.demand.authPolicy}
        />
        <Input
          label="Demand username"
          section="demand"
          property="username"
          onInputChange={onInputChange}
          initialValue={project.demand.username}
        />
        <Input
          label="Demand password"
          section="demand"
          property="password"
          onInputChange={onInputChange}
          initialValue={project.demand.password}
        />
        <h3>Demand flow</h3>
        <EditableFlowTable
          items={project.demand.flow}
          actions={[{ label: 'Remove', onClick: (i) => {
            onListItemRemove('demand', 'flow', i);
          } }]}
        />
        <AddFlowItem
          onAddClick={(name) => {
            addItemToDemandFlowList(name);
          }}
        />

        <h2>Defect</h2>
        <Input
          label="Defect source"
          section="defect"
          property="source"
          onInputChange={onInputChange}
          initialValue={project.defect.source}
        />
        <Input
          label="Defect source URL"
          section="defect"
          property="url"
          onInputChange={onInputChange}
          initialValue={project.defect.url}
        />
        <Input
          label="Defect project"
          section="defect"
          property="project"
          onInputChange={onInputChange}
          initialValue={project.defect.project}
        />
        <Input
          label="Defect auth policy"
          section="defect"
          property="authPolicy"
          onInputChange={onInputChange}
          initialValue={project.defect.authPolicy}
        />
        <Input
          label="Defect username"
          section="defect"
          property="username"
          onInputChange={onInputChange}
          initialValue={project.defect.username}
        />
        <Input
          label="Defect password"
          section="defect"
          property="password"
          onInputChange={onInputChange}
          initialValue={project.defect.password}
        />
        <h3>Defect flow</h3>
        <EditableFlowTable
          items={project.defect.flow}
          actions={[{ label: 'Remove', onClick: (i) => {
            onListItemRemove('defect', 'flow', i);
          } }]}
        />
        <AddFlowItem
          onAddClick={(name) => {
            addItemToDefectFlowList(name);
          }}
        />
        <h3>Defect severity</h3>
        <EditableSeverityTable
          items={project.defect.severity}
          actions={[{ label: 'Remove', onClick: (i) => {
            onListItemRemove('defect', 'severity', i);
          } }]}
        />
        <AddSeverityItem
          onAddClick={(name, groupWith) => {
            addItemToSeverityList(name, groupWith);
          }}
        />

        <h2>Effort</h2>
        <Input
          label="Effort source"
          section="effort"
          property="source"
          onInputChange={onInputChange}
          initialValue={project.effort.source}
        />
        <Input
          label="Effort source URL"
          section="effort"
          property="url"
          onInputChange={onInputChange}
          initialValue={project.effort.url}
        />
        <Input
          label="Effort project"
          section="effort"
          property="project"
          onInputChange={onInputChange}
          initialValue={project.effort.project}
        />
        <Input
          label="Effort auth policy"
          section="effort"
          property="authPolicy"
          onInputChange={onInputChange}
          initialValue={project.effort.authPolicy}
        />
        <Input
          label="Effort username"
          section="effort"
          property="username"
          onInputChange={onInputChange}
          initialValue={project.effort.username}
        />
        <Input
          label="Effort password"
          section="effort"
          property="password"
          onInputChange={onInputChange}
          initialValue={project.effort.password}
        />
        <h3>Roles</h3>
        <EditableRoleTable
          items={project.effort.role}
          actions={[{ label: 'Remove', onClick: (i) => {
            onListItemRemove('effort', 'role', i);
          } }]}
        />
        <AddRoleItem
          onAddClick={(name, groupWith) => {
            addItemToRoleList(name, groupWith);
          }}
        />
      </form>
    );
  }
}

export default EditProject;

EditProject.propTypes = {
  project: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired,
  initializeFormData: PropTypes.func.isRequired,
  onListItemRemove: PropTypes.func.isRequired,
  addItemToDemandFlowList: PropTypes.func.isRequired,
  addItemToDefectFlowList: PropTypes.func.isRequired,
  addItemToRoleList: PropTypes.func.isRequired,
  addItemToSeverityList: PropTypes.func.isRequired,
};