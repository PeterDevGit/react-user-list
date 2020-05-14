<?php

add_filter('user_contactmethods', 'ved_user_contactmethods');
function ved_user_contactmethods($user_contactmethods){
    $user_contactmethods['user_name_api'] = 'Name';
    $user_contactmethods['user_subname_api'] = 'Subname';
    $user_contactmethods['user_dateOfBirthday_api'] = 'Date of birthday';
    $user_contactmethods['user_phone_api'] = 'Phone';
    $user_contactmethods['user_email_api'] = 'Email';
    $user_contactmethods['user_create_api'] = 'Create user date';
    $user_contactmethods['user_update_api'] = 'Update user date';
    return $user_contactmethods;
}


/*phone_user*/
function phone_user_api_data() {
    register_rest_field(
    'user',
    'user_phone_api',
        array(
            'get_callback'  => 'rest_get_field_api',
            'update_callback'   => null,
            'schema'            => null,
        )
    );
}

add_action( 'rest_api_init', 'phone_user_api_data' );

function rest_get_field_api( $user, $user_api_field, $request ) {
return get_user_meta( $user['id'], $user_api_field, true );
}


/*user_name_api*/
function name_user_api_data() {
    register_rest_field(
        'user',
        'user_name_api',
        array(
            'get_callback'  => 'rest_get_field_api_name',
            'update_callback'   => null,
            'schema'            => null,
        )
    );
}

add_action( 'rest_api_init', 'name_user_api_data' );

function rest_get_field_api_name( $user, $user_api_field, $request ) {
    return get_user_meta( $user['id'], $user_api_field, true );
}


/*user_subname_api*/
function subname_user_api_data() {
    register_rest_field(
        'user',
        'user_subname_api',
        array(
            'get_callback'  => 'rest_get_field_api_subname',
            'update_callback'   => null,
            'schema'            => null,
        )
    );
}

add_action( 'rest_api_init', 'subname_user_api_data' );

function rest_get_field_api_subname( $user, $user_api_field, $request ) {
    return get_user_meta( $user['id'], $user_api_field, true );
}


/*user_dateOfBirthday_api*/
function dateOfBirthday_user_api_data() {
    register_rest_field(
        'user',
        'user_dateOfBirthday_api',
        array(
            'get_callback'  => 'rest_get_field_api_dateOfBirthday',
            'update_callback'   => null,
            'schema'            => null,
        )
    );
}

add_action( 'rest_api_init', 'dateOfBirthday_user_api_data' );

function rest_get_field_api_dateOfBirthday( $user, $user_api_field, $request ) {
    return get_user_meta( $user['id'], $user_api_field, true );
}


/*user_email_api*/
function email_user_api_data() {
    register_rest_field(
        'user',
        'user_email_api',
        array(
            'get_callback'  => 'rest_get_field_api_email',
            'update_callback'   => null,
            'schema'            => null,
        )
    );
}

add_action( 'rest_api_init', 'email_user_api_data' );

function rest_get_field_api_email( $user, $user_api_field, $request ) {
    return get_user_meta( $user['id'], $user_api_field, true );
}


/*user_create_api*/
function create_user_api_data() {
    register_rest_field(
        'user',
        'user_create_api',
        array(
            'get_callback'  => 'rest_get_field_api_create',
            'update_callback'   => null,
            'schema'            => null,
        )
    );
}

add_action( 'rest_api_init', 'create_user_api_data' );

function rest_get_field_api_create( $user, $user_api_field, $request ) {
    return get_user_meta( $user['id'], $user_api_field, true );
}


/*user_update_api*/
function update_user_api_data() {
    register_rest_field(
        'user',
        'user_update_api',
        array(
            'get_callback'  => 'rest_get_field_api_update',
            'update_callback'   => null,
            'schema'            => null,
        )
    );
}

add_action( 'rest_api_init', 'update_user_api_data' );

function rest_get_field_api_update( $user, $user_api_field, $request ) {
    return get_user_meta( $user['id'], $user_api_field, true );
}