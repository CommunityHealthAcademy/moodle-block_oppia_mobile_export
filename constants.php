<?php

define('PLUGINPATH', '/blocks/oppia_mobile_export/');
define('PLUGINNAME', 'block_oppia_mobile_export'); 
define('OPPIA_SERVER_TABLE', 'block_oppia_mobile_server');
define('OPPIA_CONFIG_TABLE', 'block_oppia_mobile_config');
define('OPPIA_PUBLISH_LOG_TABLE', 'block_oppia_publish_log');

define('OPPIA_OUTPUT_DIR', 'output/');
define('OPPIA_MODULE_XML', '/module.xml');

// Constants for style compiling
define('STYLES_DIR', 'styles/');
define('STYLES_THEMES_DIR', 'themes/');
define('STYLES_BASE_SCSS', 'base.scss');
define('STYLES_EXTRA_SUFFIX', '_extra');
define('COMMON_STYLES_RESOURCES_DIR', 'common-resources/');
define('COURSE_STYLES_RESOURCES_DIR', '/style_resources/');

// constants for html output
define('OPPIA_HTML_SPAN_ERROR_START', '<span class="export-error">');
define('OPPIA_HTML_SPAN_END', '</span>');
define('OPPIA_HTML_BR', '<br/>');
define('OPPIA_HTML_STRONG_END', '</strong>');
define('OPPIA_HTML_LI_END', '</li>');
define('OPPIA_HTML_H2_START', '<h2>');
define('OPPIA_HTML_H2_END', '</h2>');