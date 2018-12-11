// globally import bootstrap
import 'bootstrap';

// import knockout for app so we can apply bindings
import * as ko from 'knockout';

// import all components here
import './components/hello-world/loader';
import './components/markdown-editor/loader';

// app can be built out if needed
function app() {}

// apply bindings so our knockoutJs app works
ko.applyBindings(new app())
