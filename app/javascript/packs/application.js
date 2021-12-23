import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"
import "bootstrap-select"
import "../css/application"
import "../css/custom"
import "../trix-editor-overrides"
import "jquery"
import "../vendor/@fortawesome/fontawesome-free/css/all"
import "../front/css/font"
import "../assets/js"
import "../vendor/bootstrap/dist/css/bootstrap.min"
import "../vendor/popper.js/dist/umd/popper.min"
import "../dashboard/assets/vendor/nucleo/css/nucleo.css"
import "../vendor/prismjs/themes/prism.css"
import "../front/css/font"

const images = require.context('../images', true)

//import "jquery-ujs"

$('select').selectpicker();

$('#myTabs a').click(function (e) {
	  e.preventDefault()
	  $(this).tab('show')
	})

Rails.start()
Turbolinks.start()
ActiveStorage.start()

require("trix")
require("@rails/actiontext")