/**
 * Solartis Policy Issuance API for ILT
 * To Policy Issuance for Leisure Travel from Solartis Rate API.
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import * as models from './models';

export interface RequestServiceRequestDetail {
    ServiceRequestVersion?: string;

    ServiceResponseVersion?: string;

    OwnerId?: string;

    ResponseType?: RequestServiceRequestDetail.ResponseTypeEnum;

    RegionCode?: string;

    Token?: string;

    UserName?: string;

    LanguageCode?: string;

}
export namespace RequestServiceRequestDetail {
    export enum ResponseTypeEnum {
        JSON = <any> 'JSON',
        XML = <any> 'XML'
    }
}
