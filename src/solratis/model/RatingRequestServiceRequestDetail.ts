/**
 * Solartis Rate API for ILT
 * To get rate for Leisure Travel from Solartis Rate API.
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import * as models from './models';

export interface RatingRequestServiceRequestDetail {
    ServiceRequestVersion?: string;

    ServiceResponseVersion?: string;

    OwnerId?: string;

    ResponseType?: RatingRequestServiceRequestDetail.ResponseTypeEnum;

    RegionCode?: string;

    Token?: string;

    UserName?: string;

    LanguageCode?: string;

}
export namespace RatingRequestServiceRequestDetail {
    export enum ResponseTypeEnum {
        JSON = <any> 'JSON',
        XML = <any> 'XML'
    }
}
