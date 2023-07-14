import {
    $attrs,
    help,
    icon,
    inner,
    label,
    message,
    messages,
    suffix,
    textInput,
    wrapper,
    textareaInput,
    boxOption, boxOptions
} from "@formkit/inputs";
import {FormKitTypeDefinition} from '@formkit/core/dist'

/// auth / use route loader  /table
export const custom_text_schema:FormKitTypeDefinition={
    forceTypeProp:'text',
    schema: wrapper(
        $attrs(
            {
                class:'input-effect-wrapper'
            },
            inner(
                $attrs(
                    {
                        class:'input-effect',
                        required:true,
                    },
                    textInput()
                ),
                $attrs(
                    {
                        class:'input-effect-label'
                    },
                    label('$label')
                ),
                $attrs(
                    {
                        class: 'focus-border',
                    },
                    label(
                        label()
                    )
                ),

            ),
        ),
        $attrs(
            {
                class:'input-hint'
            },
            help('$help')
        ),
        $attrs(
            {
                class:'error-message'
            },
            messages(message('$message.value'))
        )
    ),
    type:'input',
}
export const custom_password_schema:FormKitTypeDefinition={
    forceTypeProp:'password',
    schema: wrapper(
        $attrs(
            {
                class:'input-effect-wrapper'
            },
            inner(
                $attrs(
                    {
                        class:'input-effect',
                        required:true,
                        style:'padding-right:2rem !important'
                    },
                    textInput()
                ),
                $attrs(
                    {
                        class:'input-effect-label'
                    },
                    label('$label')
                ),
                $attrs(
                    {
                        class: 'focus-border',
                    },
                    label(
                        label()
                    )
                ),
                suffix(),
                $attrs(
                    {
                        class:'password-icon'
                    },
                    icon('suffix')
                )

            ),
        ),
        $attrs(
            {
                class:'input-hint'
            },
            help('$help')
        ),
        $attrs(
            {
                class:'error-message'
            },
            messages(message('$message.value'))
        )
    ),
    type:'input',

}
export const custom_placeholder_schema:FormKitTypeDefinition={
    forceTypeProp:'text',
    schema: wrapper(
        $attrs(
            {
                class:'input-effect-wrapper w-full'
            },
            inner(
                $attrs(
                    {
                        class:'input-effect',
                        required:true,
                        placeholder:'$label'
                    },
                    textInput()
                ),
                $attrs(
                    {
                        class: 'focus-border',
                    },
                    label(
                        label()
                    )
                ),
                suffix(),
                $attrs(
                    {
                        class:'password-icon'
                    },
                    icon('suffix')
                )

            ),
        ),
        $attrs(
            {
                class:'input-hint'
            },
            help('$help')
        ),
        $attrs(
            {
                class:'error-message'
            },
            messages(message('$message.value'))
        )
    ),
    type:'input',
}
export const custom_number_schema:FormKitTypeDefinition={
    forceTypeProp:'number',
    schema: wrapper(
        $attrs(
            {
                class:'input-effect-wrapper'
            },
            inner(
                $attrs(
                    {
                        class:'input-effect',
                        required:true,

                    },
                    textInput()
                ),
                $attrs(
                    {
                        class:'input-effect-label'
                    },
                    label('$label')
                ),
                $attrs(
                    {
                        class: 'focus-border',
                    },
                    label(
                        label()
                    )
                ),

            ),
        ),
        $attrs(
            {
                class:'input-hint'
            },
            help('$help')
        ),
        $attrs(
            {
                class:'error-message'
            },
            messages(message('$message.value'))
        )
    ),
    type:'input',
}
export const custom_date_schema:FormKitTypeDefinition={
    forceTypeProp:'date',
    schema: wrapper(
        $attrs(
            {
                class:'input-effect-wrapper w-full'
            },
            inner(
                $attrs(
                    {
                        class:'input-effect',
                        required:true,
                        'data-wide':true,
                        placeholder:'$label'
                    },
                    textInput()
                ),
                $attrs(
                    {
                        class:'input-effect-label'
                    },
                    label('$label')
                ),
                $attrs(
                    {
                        class: 'focus-border',
                    },
                    label(
                        label()
                    )
                ),
                suffix(),
                $attrs(
                    {
                        class:'password-icon'
                    },
                    icon('suffix')
                )

            ),
        ),
        $attrs(
            {
                class:'input-hint'
            },
            help('$help')
        ),
        $attrs(
            {
                class:'error-message'
            },
            messages(message('$message.value'))
        )
    ),
    type:'input',
};
export const custom_area_schema:FormKitTypeDefinition={

    schema: wrapper(
        $attrs(
            {
                class:'input-effect-wrapper w-full'
            },
            inner(
                $attrs(
                    {
                        class:'input-effect',
                        required:true,
                        placeholder:'$label'
                    },
                    textareaInput()
                ),
                $attrs(
                    {
                        class: 'focus-border',
                    },
                    label(
                        label()
                    )
                ),
                suffix(),
                $attrs(
                    {
                        class:'password-icon'
                    },
                    icon('suffix')
                )

            ),
        ),
        $attrs(
            {
                class:'input-hint'
            },
            help('$help')
        ),
        $attrs(
            {
                class:'error-message'
            },
            messages(message('$message.value'))
        )
    ),
    type:'input',
};
export const custom_radio_schema:FormKitTypeDefinition={
    forceTypeProp:'radio',
    props:['options','check'],
    schema: wrapper(
        $attrs(
            {
                class:'radio-options mt-0.5'
            },
            boxOptions(
                $attrs(
                    {
                        class:'radio-option'
                    },
                    boxOption
                    (
                        $attrs(
                            {
                                class:'v-checkbox cursor-pointer',
                                type:'radio',
                                name:'$label',
                                id:'$option',
                                checked:'$value===$option',
                                value:'$option',
                            },
                            textInput()
                        ),
                        $attrs(
                            {
                                for:'$option',
                                class:'cursor-pointer text-0.9'

                            },
                            label('$option')
                        )
                    )),
                )
        )

    ),
    type:'input',
};
