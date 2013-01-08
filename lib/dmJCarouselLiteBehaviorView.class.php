<?php
/**
 * @author TheCelavi
 */
class dmJCarouselLiteBehaviorView extends dmBehaviorBaseView {

    protected function filterBehaviorVars(array $vars = array()) {
        $vars = array_merge(sfConfig::get('dm_dmJCarouselLiteBehavior_defaults'), parent::filterBehaviorVars($vars));
        return $vars;
    }

    public function getJavascripts() {
        $vars = $this->getBehaviorVars();
        return array_merge(
            parent::getJavascripts(),
            ($vars['mouse_wheel']) ? array('dmJCarouselLiteBehaviorPlugin.mousewheel') : array(),
            array(
                'lib.easing',
                'dmJCarouselLiteBehaviorPlugin.jcarousellite',
                'dmJCarouselLiteBehaviorPlugin.launch'
            )
        );
    }
    
    public function getStylesheets() {
        $registeredThemes = sfConfig::get('dm_dmJCarouselLiteBehavior_themes');
        $vars = $this->getBehaviorVars();
        $theme = array();
        if (isset($registeredThemes[$vars['theme']])) $theme[] = $registeredThemes[$vars['theme']];
        return array_merge(
            parent::getStylesheets(),
            $theme
        );
    }

}

