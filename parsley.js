/*
  Parsley.js allows you to verify your form inputs frontend side, without writing a line of javascript. Or so..

  author: Guillaume Potier - @guillaumepotier
*/

!function ($) {

  "use strict";

  /* VALIDATORS FUNCTIONS DEFINITION
  * ========================= */
  var ValidatorsFn = function ( options ) {
  }

  ValidatorsFn.prototype = {

    constructor: ValidatorsFn

    , notnull: function ( val ) {
      return val.length > 0;
    }

    , notblank: function ( val ) {
      return '' !== val.replace( /^\s+/g, '' ).replace( /\s+$/g, '' );
    }

    , required: function ( val ) {
      return this.notnull( val ) && this.notblank( val );
    }

    , type: function ( val, type ) {
      var regExp;

      switch ( type ) {
        case "number":
          regExp = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/;
          break;
        case "digits":
          regExp = /^\d+$/;
          break;
        case "alphanum":
          regExp = /^\w+$/;
          break;
        case "email":
          regExp = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
          break;
        case "url":
          regExp = /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
          break;
        case "dateIso":
          regExp = /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/;
          break;
        default:
          return false;
          break;
      }

      return regExp.test( val );
    }

    , minlength: function ( val, min ) {
      return val.length >= min;
    }

    , maxlength: function ( val, max ) {
      return val.length <= max;
    }

    , rangelength: function ( val, arrayRange ) {
      return this.minlength( val, arrayRange[0] ) && this.maxlength( val, arrayRange[1] );
    }

    , min: function ( val, min ) {
      return val >= min;
    }

    , max: function ( val, max ) {
      return val <= max;
    }

    , range: function ( val, arrayRange ) {
      return val >= arrayRange[0] && val <= arrayRange[1];
    }
  }

 /* PARSLEY PUBLIC CLASS DEFINITION
  * =============================== */
  var Parsley = function ( element, validatorsFn, options ) {
    this.init( 'parsley', element, validatorsFn, options );
  }

  Parsley.prototype = {

    constructor: Parsley

    /* init data, bind jQuery on() actions */
    , init: function ( type, element, validatorsFn, options ) {
      this.type = type;
      this.validatorsFn = validatorsFn;
      this.registeredValidators = new Array();
      this.$element = $( element );
      this.options = this.getOptions( options );
      this.parentForm = this.$element.closest( 'form' );
      this.isValid = false;

      // bind parsley validators functions for item
      for ( var method in this.options ) {
        method = method.toLowerCase();

        if ( 'function' === typeof validatorsFn[method] ) {
          this.registeredValidators.push( {
              "method": method
            , "params": this.options[method]
          } );
        }
      }

      // if there are validators for this field, bind verification events
      if ( this.registeredValidators.length ) {
        this.$element.addClass( 'parsley-validated' );
        this.$element.on( this.options.events.join( '.' + this.type + ' ') , false, $.proxy( this.validate, this ) );
        $( this.parentForm ).on( 'submit' , false, $.proxy( this.onSubmitValidate, this ) );
      }
    }

    , getOptions: function ( options ) {
      return $.extend( {}, $.fn[this.type].defaults, options, this.$element.data() );
    }

    , onSubmitValidate: function ( event ) {
      if ( false === this.validate( true ) && 'undefined' !== typeof event && 'undefined' !== typeof event.preventDefault()) {
        event.preventDefault();
      }
    }

    , validate: function ( onSubmit ) {
      var val = this.$element.val();

      // do validation process if field has enough chars and not previously checked
      if ( 'undefined' === typeof onSubmit && val.length < this.options.minChars && !( this.$element.hasClass( 'parsley-error' ) || this.$element.hasClass( 'parsley-success' ) ) ) {
        return true;
      }

      // some binded events are redundant (change & paste for example), validate only once by field change
      if ( this.val === this.$element.val() ) {
        return this.isValid;
      }

      this.val = this.$element.val();

      // apply all field's validations rules
      for ( var i in this.registeredValidators ) {
        if ( !this.validatorsFn[this.registeredValidators[i].method](val, this.registeredValidators[i].params) ) {
          this.manageErrors();
          return this.isValid;
        }
      }

      this.$element.removeClass( 'parsley-error' ).addClass( 'parsley-success' );
      this.isValid = true;
      return this.isValid;
    }

    , manageErrors: function () {
      this.isValid = false;
      this.$element.removeClass( 'parsley-success' ).addClass( 'parsley-error' );
    }
  }

  /* PARSLEY PLUGIN DEFINITION
  * ========================= */
  $.fn.parsley = function ( option, fn ) {
    var options = $.extend(true, {}, $.fn.parsley.defaults, option, this.data() )
      , validatorsFn = new ValidatorsFn()
      , returnValue = false;

    function bind ( self ) {
      var $this = $( self )
        , data = $this.data( 'parsley' )
        , fieldOptions = $.extend( {}, options, $this.data() );

      // if data never binded, bind it right now!
      if ( !data ) {
        $this.data( 'parsley', ( data = new Parsley( self, validatorsFn, fieldOptions ) ) );
      }

      // here is our parsley public function accessor, currently does not support args
      if ( 'string' === typeof option && 'function' === typeof data[option] ) {
        return data[option]();
      }
    }

    // loop through every elemt we want to parsley
    this.each(function () {
      // if a form elem is given, bind all its input children
      if ( $( this ).is( 'form' ) ) {
        $( this ).find( options.inputs ).each( function () {
          returnValue = bind( $( this ) );
        });

      // if it is a Parsley supported single element, bind it too
      // add here a return instance, cuz' we could call public methods on single elems with data[option]() above
      } else if ( $( this ).is( options.inputs ) ) {
        returnValue = bind( $( this ) );
      }
    });

    return 'function' === typeof fn ? fn() : returnValue;
  }

  /* PARSLEY CONFIGS & OPTIONS
  * ========================= */
  $.fn.parsley.Constructor = Parsley;

  $.fn.parsley.defaults = {
    inputs: 'input, textarea, select'                                                 // Default supported inputs.
    , events: [ 'change', 'keyup', 'paste' ]                                       // Events list that trigger a validation
    , minChars: 4                                                                     // Trigger validators if value >= minChars
  }

  /* PARSLEY DATA-API
  * =============== */
  $( window ).on( 'load', function () {
    $( '[data-validate="parsley"]' ).each( function () {
      $(this).parsley();
    })
  });

// This plugin works with jQuery or Zepto (with data extension builded for Zepto.)
}(window.jQuery || window.Zepto);