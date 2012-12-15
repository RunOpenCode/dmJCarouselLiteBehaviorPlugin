<?php

/**
 * @author TheCelavi
 */
class dmJCarouselLiteBehaviorForm extends dmBehaviorBaseForm
{

    protected $themes;
    
    protected $pager = array(
        'none' => 'None',
        'top' => 'Top',
        'bottom' => 'Bottom'
    );
    
    protected $navigation = array(
        'none' => 'None',
        'top' => 'Top',
        'bottom' => 'Bottom',
        'side' => 'Left, right (for horizontal) / Top, bottom (for vertical)'
    );
    
    public function __construct($behavior, $options = array(), $CSRFSecret = null)
    {
        $keys = array_keys(sfConfig::get('dm_dmJCarouselLiteBehavior_themes'));
        $values = array();
        foreach ($keys as $key)
            $values[] = dmString::humanize($key);
        $this->themes = array_combine($keys, $values);

        parent::__construct($behavior, $options, $CSRFSecret);
    }

    public function configure()
    {
        $this->widgetSchema['inner_target'] = new sfWidgetFormInputText();
        $this->validatorSchema['inner_target'] = new sfValidatorString(array(
                'required' => false
            ));

        $this->widgetSchema['theme'] = new sfWidgetFormChoice(array(
            'choices'=> $this->getI18n()->translateArray($this->themes)
        ));
        $this->validatorSchema['theme'] = new sfValidatorChoice(array(
            'choices'=>  array_keys($this->themes)
        ));
        
        $this->widgetSchema['item_width'] = new sfWidgetFormInputText();
        $this->validatorSchema['item_width'] = new sfValidatorInteger(array(
                'min' => 10
        ));

        $this->widgetSchema['item_height'] = new sfWidgetFormInputText();
        $this->validatorSchema['item_height'] = new sfValidatorInteger(array(
                'min' => 10
        ));

        $this->widgetSchema['mouse_wheel'] = new sfWidgetFormInputCheckbox();
        $this->validatorSchema['mouse_wheel'] = new sfValidatorBoolean();

        $this->widgetSchema['auto_scroll'] = new sfWidgetFormInputCheckbox();
        $this->validatorSchema['auto_scroll'] = new sfValidatorBoolean();
        
        $this->widgetSchema['auto_scroll_period'] = new sfWidgetFormInputText();
        $this->validatorSchema['auto_scroll_period'] = new sfValidatorInteger(array(
                'min' => 500
        ));

        $this->widgetSchema['speed'] = new sfWidgetFormInputText();
        $this->validatorSchema['speed'] = new sfValidatorInteger(array(
                'min' => 0
        ));

        $this->widgetSchema['easing'] = new dmWidgetFormChoiceEasing();
        $this->validatorSchema['easing'] = new dmValidatorChoiceEasing(array(
                'required' => true
        ));

        $this->widgetSchema['is_vertical'] = new sfWidgetFormInputCheckbox();
        $this->validatorSchema['is_vertical'] = new sfValidatorBoolean();

        $this->widgetSchema['is_circular'] = new sfWidgetFormInputCheckbox();
        $this->validatorSchema['is_circular'] = new sfValidatorBoolean();

        $this->widgetSchema['visible'] = new sfWidgetFormInputText();
        $this->validatorSchema['visible'] = new sfValidatorNumber(array(
                'min' => 1
        ));

        $this->widgetSchema['start'] = new sfWidgetFormInputText();
        $this->validatorSchema['start'] = new sfValidatorInteger(array(
                'min' => 1
        ));

        $this->widgetSchema['scroll'] = new sfWidgetFormInputText();
        $this->validatorSchema['scroll'] = new sfValidatorInteger(array(
                'min' => 1
        ));

        $this->widgetSchema['hover_pause'] = new sfWidgetFormInputCheckbox();
        $this->validatorSchema['hover_pause'] = new sfValidatorBoolean();

        $this->widgetSchema['navigation'] = new sfWidgetFormChoice(array(
            'choices'=> $this->getI18n()->translateArray($this->navigation)
        ));
        $this->validatorSchema['navigation'] = new sfValidatorChoice(array(
            'choices'=>  array_keys($this->navigation)
        ));
        
        $this->widgetSchema['pager'] = new sfWidgetFormChoice(array(
            'choices'=> $this->getI18n()->translateArray($this->pager)
        ));
        $this->validatorSchema['pager'] = new sfValidatorChoice(array(
            'choices'=>  array_keys($this->pager)
        ));

        $this->getWidgetSchema()->setLabels(sfConfig::get('dm_dmJCarouselLiteBehavior_labels', array()));
        $this->getWidgetSchema()->setHelps(sfConfig::get('dm_dmJCarouselLiteBehavior_helps', array()));
        
        if (is_null($this->getDefault('item_width'))) {
            $this->getWidgetSchema()->setDefaults(sfConfig::get('dm_dmJCarouselLiteBehavior_defaults', array()));
        }
        
        parent::configure();
    }

}

