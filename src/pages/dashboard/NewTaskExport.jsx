export default function NewTaskExport(){
    return (
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="btn-toolbar dropdown">
          <button
            className="btn btn-primary btn-sm mr-2 dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="fas fa-plus mr-2"></span>New Task
          </button>
          <div className="dropdown-menu dashboard-dropdown dropdown-menu-left mt-2">
            <a className="dropdown-item font-weight-bold" href="#">
              <span className="fas fa-tasks"></span>New Task
            </a>
            <a className="dropdown-item font-weight-bold" href="#">
              <span className="fas fa-cloud-upload-alt"></span>Upload Files
            </a>
            <a className="dropdown-item font-weight-bold" href="#">
              <span className="fas fa-user-shield"></span>Preview Security
            </a>
            <div role="separator" className="dropdown-divider"></div>
            <a className="dropdown-item font-weight-bold" href="#">
              <span className="fas fa-rocket text-danger"></span>Upgrade to Pro
            </a>
          </div>
        </div>
        <div className="btn-group">
          <button type="button" className="btn btn-sm btn-outline-primary">
            Share
          </button>
          <button type="button" className="btn btn-sm btn-outline-primary">
            Export
          </button>
        </div>
      </div>
    )
}