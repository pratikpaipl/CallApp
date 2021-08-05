import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Platform } from '@ionic/angular';
import { GlobalProvider } from '../shared/GlobalProvider';
import { StorageService } from '../shared/StorageService';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, public globle: GlobalProvider, public store: StorageService, public platform: Platform) {
  }
  getDownloadFileUrl(clss, keyword, lat, lng, dist, sort, lType, sType, brandId, stockistId, address, type, subtype?, slug?) {
    let Url = ''
    if (keyword == undefined)
      keyword = ''
    if (type == 'all')
      Url = "all/valid_all_excel?"
    if (subtype == undefined || subtype == 'brand' || subtype == 'stockist') {
      if (type == 'location')
        Url = "shop/valid_shop_excel?"
      else if (type == 'stockist')
        Url = "stockist/valid_stockist_excel?"
      else if (type == 'brands')
        Url = "brand/valid_brand_excel?"
      else if (type == 'products')
        Url = "product/valid_product_excel?"
    } else if (subtype == 'products') {
      Url = "product/"
      if (type == 'location')
        Url = Url + "product_places_excel"
      else if (type == 'stockist')
        Url = Url + "product_stockists_excel"
      Url = Url + "?ProductSlug=" + slug + "&"
    } else if (subtype == 'place') {
      Url = "shop/"
      if (type == 'brands')
        Url = Url + "shop_brands_excel"
      else if (type == 'products')
        Url = Url + "shop_products_excel"
      Url = Url + "?StockistLocationSlug=" + slug + "&"
    }
    this.callGet(Url + "keyword=" + keyword + "&BrandID=" + brandId + "&StockistID=" + stockistId + "&Classification=" + clss + "&MaxDistance=" + dist + "&Latitude=" + lat + "&Longitude=" + lng + "&SortBy=" + sort + "&LocationType=" + lType + "&addressText=" + address + "&ShoppingType=" + sType, '', true)
  }
  saveFileFromUrl(url: any) {
    const req = new HttpRequest('GET', url, {
      reportProgress: true,
      responseType: "blob"//blob type pls
    });

    //all possible events
    this.http.request(req).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request sent!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header received!');
          break;
        case HttpEventType.DownloadProgress:
          console.log('File download --> ', Math.trunc(event.loaded / event.total * 100));
          break;
        case HttpEventType.Response:
          //do whatever you have to do with the file using event.body
          console.log('😺 Done!', event.body);
          //i'm gonna write the file in my case

          var url = window.URL.createObjectURL(event.body);
          window.open(url);
      }
    });
  }
  brandKeywordSearch(): any {
    let params = "?keyword="
    if (this.store.getToken())
      return this.callGet("brand/valid_brand_search_with_login", params);
    else
      return this.callGet("brand/valid_brand_search_without_login", params);
  }
  brandLoginKeywordSearch(): any {
    let params = "?keyword="
    return this.callGet("brand/valid_brand_search_with_login", params);
  }
  getAll(start, limit, clss, keyword, lat, lng, dist, sort, ltype, sType, brandId, stockistId, page?, pageAdmin?): any {
    if (keyword == undefined)
      keyword = ''
    if (page != 'details')
      this.setLoclData(dist, clss, lat, lng, keyword, sort, brandId, stockistId);
    var parms = "?SkipCount=" + start + "&Keyword=" + keyword + "&BrandID=" + brandId + "&StockistID=" + stockistId + "&LimitCount=" + limit + "&Classification=" + clss + "&MaxDistance=" + dist + "&Latitude=" + lat + "&Longitude=" + lng + "&SortBy=" + sort + "&LocationType=" + ltype + "&ShoppingType=" + sType
    return this.callGet("all/valid_explorer_list", parms);
  }
  getShop(start, limit, clss, keyword, lat, lng, dist, sort, ltype, sType, brandId, stockistId, page?, pageAdmin?): any {
    if (keyword == undefined)
      keyword = ''
    if (page != 'details') {
      this.setLoclData(dist, clss, lat, lng, keyword, sort, brandId, stockistId);
    }
    let params = "?SkipCount=" + start + "&Keyword=" + keyword + "&BrandID=" + brandId + "&StockistID=" + stockistId + "&LimitCount=" + limit + "&Classification=" + clss + "&MaxDistance=" + dist + "&Latitude=" + lat + "&Longitude=" + lng + "&SortBy=" + sort + "&LocationType=" + ltype + "&ShoppingType=" + sType
    if (pageAdmin != undefined)
      params = params + "&PageAdmin=" + pageAdmin

    return this.callGet("shop/valid_explorer_list", params);
  }
  getBrand(start, limit, clss, keyword, lat, lng, dist, sort, ltype, sType, brandId, stockistId, page?, pageAdmin?): any {
    if (keyword == undefined)
      keyword = ''
    if (page != 'details')
      this.setLoclData(dist, clss, lat, lng, keyword, sort, brandId, stockistId);
    var parms = "?SkipCount=" + start + "&Keyword=" + keyword + "&BrandID=" + brandId + "&StockistID=" + stockistId + "&LimitCount=" + limit + "&Classification=" + clss + "&MaxDistance=" + dist + "&Latitude=" + lat + "&Longitude=" + lng + "&SortBy=" + sort + "&LocationType=" + ltype + "&ShoppingType=" + sType
    return this.callGet("brand/valid_explorer_list", parms);
  }
  getStockist(start, limit, clss, keyword, lat, lng, dist, sort, ltype, sType, brandId, stockistId, page?, pageAdmin?): any {
    if (keyword == undefined)
      keyword = ''
    if (page != 'details')
      this.setLoclData(dist, clss, lat, lng, keyword, sort, brandId, stockistId);
    let params = "?SkipCount=" + start + "&Keyword=" + keyword + "&BrandID=" + brandId + "&StockistID=" + stockistId + "&LimitCount=" + limit + "&Classification=" + clss + "&MaxDistance=" + dist + "&Latitude=" + lat + "&Longitude=" + lng + "&SortBy=" + sort + "&LocationType=" + ltype + "&ShoppingType=" + sType
    if (pageAdmin != undefined)
      params = params + "&PageAdmin=" + pageAdmin
    return this.callGet("stockist/valid_explorer_list" + params);
  }
  getProduct(start, limit, clss, keyword, lat, lng, dist, sort, ltype, sType, brandId, stockistId, page?, pageAdmin?): any {
    if (keyword == undefined)
      keyword = ''
    if (page != 'details')
      this.setLoclData(dist, clss, lat, lng, keyword, sort, brandId, stockistId);
    let params = "?SkipCount=" + start + "&Keyword=" + keyword + "&BrandID=" + brandId + "&StockistID=" + stockistId + "&LimitCount=" + limit + "&Classification=" + clss + "&MaxDistance=" + dist + "&Latitude=" + lat + "&Longitude=" + lng + "&SortBy=" + sort + "&LocationType=" + ltype + "&ShoppingType=" + sType
    if (pageAdmin != undefined)
      params = params + "&PageAdmin=" + pageAdmin

    return this.callGet("product/valid_explorer_list", params);
  }
  setLoclData(dist, clss, lat, lng, keyword, sort, brandId, stockistId) {
    this.store.saveData('dist', dist);
    this.store.saveData('clssif', clss);
    this.store.saveData('lat', lat);
    this.store.saveData('lng', lng);
    this.store.saveData('dLat', lat);
    this.store.saveData('dLng', lng);
    if (keyword == '') {
      this.store.saveData('lType', 'nearest');
    } else {
      this.store.saveData('lType', sort);
    }
    this.store.saveData('brand-f', brandId);
    this.store.saveData('stockist-f', stockistId);

  }
  getLabelList(start, limit, clss, keyword, lat, lng, dist, sort, ltype, sType, brandId, stockistId): any {
    if (keyword == undefined)
      keyword = ''
    var parms = "?SkipCount=" + start + "&LimitCount=" + limit
    return this.callGet("label/list", parms);
  }
  getPageUserList(pageID, type): any {
    var parms = "?PageID=" + pageID + "&PageType=" + type
    return this.callGet("role_permission/page_user_list", parms);
  }
  sendBrandAccessInvitation(postData): any {
    return this.callPost("role_permission/send_brand_access_invitation", postData);
  }
  confirmPageInvitation(postData): any {
    return this.callPost('role_permission/confirm_page_invitation', postData);
  }
  brandPageRequestApproval(postData): any {
    return this.callPost('role_permission/brand_page_request_approval', postData);
  }
  resendPageRoleInvitation(postData): any {
    return this.callPost('role_permission/resend_page_role_invitation', postData);
  }
  deletePageUserRole(postData): any {
    return this.callPost('role_permission/delete_page_user_role', postData);
  }
  sendBrandAccessRequest(postData): any {
    return this.callPost('role_permission/send_brand_access_request', postData);
  }
  getEditDetails(slugs): any {
    var parms = "?BrandSlug=" + slugs
    return this.callGet("brand/brand_info", parms);
  }
  brandDelete(slugs): any {
    let postData = new FormData();
    postData.append("BrandSlug", slugs);
    return this.callPost("brand/delete", postData);
  }
  getDetails(type, slugs, clss, lat, lng, dist, ltype, sType, brandId, stockistId, pageAdmin): any {

    let params = "?Classification=" + clss + "&Latitude=" + lat + "&Longitude=" + lng + "&MaxDistance=" + dist + "&LocationType=" + ltype + "&ShoppingType=" + sType + "&BrandID=" + brandId + "&StockistID=" + stockistId + "&PageAdmin=" + pageAdmin;
    if (type == 'brand') {
      params = params + "&BrandSlug=" + slugs
      return this.callGet("brand/brand_detail", params);
    }
    else if (type == 'stockist') {
      params = params + "&StockistSlug=" + slugs
      return this.callGet("stockist/stockist_detail", params);
    }
    else if (type == 'products') {
      params = params + "&ProductSlug=" + slugs
      return this.callGet("product/product_detail", params);
    }
    else {
      params = params + "&StockistLocationSlug=" + slugs
      return this.callGet("shop/shop_detail", params);
    }
  }
  getShopBrands(start, limit, slug, keyword, lat, lng, clss, brandId, stockistId, sort, pageAdmin?): any {
    if (keyword == undefined)
      keyword = ''
    let ltype = '', sType = '';
    var parms = "?StockistLocationSlug=" + slug + "&Keyword=" + keyword + "&Latitude=" + lat + "&Longitude=" + lng + "&skipCount=" + start + "&LimitCount=" + limit + "&BrandID=" + brandId + "&StockistID=" + stockistId + "&Classification=" + clss + "&SortBy=" + sort + "&LocationType=" + ltype + "&ShoppingType=" + sType
    return this.callGet("shop/shop_brands", parms);
  }
  getProductPlaces(start, limit, slug, keyword, lat, lng, clss, brandId, stockistId, sort, maxDistance, pageAdmin?): any {
    if (keyword == undefined)
      keyword = ''
    let ltype = '', sType = '';
    var parms = "?ProductSlug=" + slug + "&Keyword=" + keyword + "&Latitude=" + lat + "&Longitude=" + lng + "&skipCount=" + start + "&LimitCount=" + limit + "&BrandID=" + brandId + "&StockistID=" + stockistId + "&Classification=" + clss + "&SortBy=" + sort + "&LocationType=" + ltype + "&ShoppingType=" + sType + "&MaxDistance=" + maxDistance
    return this.callGet("product/product_places", parms);
  }
  getProductStockists(start, limit, slug, keyword, lat, lng, clss, brandId, stockistId, sort, maxDistance, pageAdmin?): any {
    if (keyword == undefined)
      keyword = ''
    let ltype = '', sType = '';
    var parms = "?ProductSlug=" + slug + "&Keyword=" + keyword + "&Latitude=" + lat + "&Longitude=" + lng + "&skipCount=" + start + "&LimitCount=" + limit + "&BrandID=" + brandId + "&StockistID=" + stockistId + "&Classification=" + clss + "&SortBy=" + sort + "&LocationType=" + ltype + "&ShoppingType=" + sType + "&MaxDistance=" + maxDistance
    return this.callGet("product/product_stockists", parms);
  }
  getShopProducts(start, limit, slug, keyword, lat, lng, clss, brandId, stockistId, sort, maxDistance, ltype, stype, pageAdmin?): any {
    if (keyword == undefined)
      keyword = ''
    let params = "?StockistLocationSlug=" + slug + "&Keyword=" + keyword + "&Latitude=" + lat + "&Longitude=" + lng + "&skipCount=" + start + "&LimitCount=" + limit + "&BrandID=" + brandId + "&StockistID=" + stockistId + "&Classification=" + clss + "&SortBy=" + sort + "&LocationType=" + ltype + "&ShoppingType=" + stype + "&MaxDistance=" + maxDistance
    if (pageAdmin != undefined)
      params = params + "&PageAdmin=" + pageAdmin

    return this.callGet("shop/shop_products", params)
  }

  getLocationsByDetails(start, limit, clss, keyword, lat, lng, dist, sort, ltype, sType, brandId, stockistId, pageAdmin?): any {
    if (keyword == undefined)
      keyword = ''
    let params = "?SkipCount=" + start + "&Keyword=" + keyword + "&BrandID=" + brandId + "&StockistID=" + stockistId + "&LimitCount=" + limit + "&Classification=" + clss + "&MaxDistance=" + dist + "&Latitude=" + lat + "&Longitude=" + lng + "&SortBy=" + sort + "&LocationType=" + ltype + "&ShoppingType=" + sType
    if (pageAdmin != undefined)
      params = params + "&PageAdmin=" + pageAdmin
    return this.callGet("location", params);
  }
  getFromIp(): any {
    return this.callGet('geocoder/place_from_ip');
  }
  placeAddressList(loc): any {
    let postData = new FormData();
    postData.append("place_address", loc);
    return this.callPost('stockist/place_address_list', postData);
  }
  productGroup(loc): any {
    let postData = new FormData();
    postData.append("keyword", loc);
    return this.callPost('product/valid_product_group_list', postData);
  }
  brandPlaces(keyword, slug): any {
    var parms = '?BrandSlug=' + slug + '&skipCount=0&LimitCount=1000&Keyword=' + keyword
    return this.callGet('brand/brand_places', parms);
  }
  brandProducts(keyword, slug): any {
    var parms = '?BrandSlug=' + slug + '&skipCount=0&LimitCount=1000&Keyword=' + keyword
    return this.callGet('brand/brand_products', parms);
  }
  stockistsAddressList(loc): any {
    let postData = new FormData();
    postData.append("StockistAddress", loc);
    return this.callPost('stockist/stockist_search', postData);
  }
  addStockistsLocation(StockistLocationImportDetailID, postData): any {
    if (StockistLocationImportDetailID != undefined && StockistLocationImportDetailID != '') {
      postData.append("StockistLocationImportDetailID", StockistLocationImportDetailID);
      return this.callPost('location/update_extracted_stockist_location_detail', postData);
    } else {
      return this.callPost('location/insert_stockist_location', postData);
    }
  }

  addBrand(postData): any {
    return this.callPost('brand/add', postData);
  }
  validateBrand(postData): any {
    return this.callPost('brand/validate_brand', postData);
  }
  confirmEmail(postData): any {
    return this.callPost('auth/confirm_email', postData);
  }
  updateNewEmail(postData): any {
    return this.callPost('auth/update_new_email', postData);
  }
  resendConfirmationEmail(postData): any {
    return this.callPost('auth/resend_confirmation_email', postData);
  }
  forgotPassword(postData): any {
    return this.callPost('auth/forgot_password', postData);
  }
  resetPassword(postData): any {
    return this.callPost('auth/reset_password', postData);
  }
  updateNewPassword(postData): any {
    return this.callPost('auth/update_new_password', postData);
  }
  updateUserProfile(postData): any {
    return this.callPost('auth/update_user_profile', postData);
  }
  getProfile(postData): any {
    return this.callPost('auth/getProfile', postData);
  }
  changeEmail(postData): any {
    return this.callPost('auth/change_user_email', postData);
  }
  changePassword(postData): any {
    return this.callPost('auth/change_password', postData);
  }
  signUp(postData): any {
    return this.callPost('auth/signup', postData);
  }
  login(postData): any {
    return this.callPost('auth/login', postData);
  }
  addFile(postData): any {
    return this.callPost('shop/upload_shop_excel', postData);
  }
  fileList(start): any {
    var parms = '?SkipCount=' + start + '&LimitCount=20'
    return this.callGet('shop/shop_excel_summary', parms);
  }
  extractExcel(id): any {
    var parms = '?StockistLocationImportSummaryID=' + id
    return this.callGet('location/extract_stockist_location_excel', parms);
  }
  deleteRec(id): any {
    var parms = '?StockistLocationImportDetailID=' + id
    return this.callGet('location/delete_extracted_stockist_location_detail', parms);
  }
  viewFile(id, start): any {
    var parms = '?StockistLocationImportSummaryID=' + id + '&skipCount=' + start + '&LimitCount=20'
    return this.callGet('location/extracted_stockist_location_list', parms);
  }
  fileUpdate(id): any {
    var parms = '?StockistLocationImportSummaryID=' + id
    return this.callGet('location/extracted_stockist_location_list', parms);
  }
  moveData(id): any {
    var parms = '?StockistLocationImportSummaryID=' + id
    return this.callGet('location/move_extracted_stockist_location_detail', parms);
  }
  addProduct(postData): any {
    return this.callPost('product/add', postData);
  }
  placeDetails(placeId): any {
    var parms = '?PlaceID=' + placeId
    return this.callGet('geocoder/place_details', parms);
  }
  suggestions(keyword): any {
    var parms = '?Keyword=' + keyword
    return this.callGet('geocoder/place_suggestions', parms);
  }
  getAddressFromGApi(latlng): any {
    var params = "?latlng=" + latlng
    return this.callGet("geocoder/gtoaddress", params);
  }
  getClassifications(): any {
    var parms = "?SkipCount=0&LimitCount=100"
    return this.callGet("classification/list", parms);
  }
  getCategory(): any {
    var parms = "?SkipCount=0&LimitCount=1000"
    return this.callGet("category", parms);
  }
  sendMail(postData): any {
    return this.callPost("mail/send_mail", postData);
  }

  callPost(endPoint, postData) {
    postData.append('LanguageCode', 'eng')
    return this.http.post(environment.BaseUrl + endPoint, postData);
  }
  callGet(endPoint, postData?, isDownload?) {
    var params = '';
    params = (postData != undefined && postData != '') ? postData + "&" : "?";
    params = params + "LanguageCode=eng";
    if (isDownload == undefined) {
      return this.http.get(environment.BaseUrl + endPoint + params);
    }
    else {
      this.http.get(environment.BaseUrl + endPoint + "&LanguageCode=eng").subscribe(response => {
        let res: any = response;
        if (res.success) {
          this.saveFileFromUrl(res.data.url);
        }
      }, (error: Response) => {
        let err: any = error;
      });
    }
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }
}
