package com.danit.finalproject.application.service.business;

import com.danit.finalproject.application.entity.business.Business;
import com.danit.finalproject.application.entity.business.BusinessPhoto;
import com.danit.finalproject.application.repository.business.BusinessRepository;
import com.danit.finalproject.application.repository.place.PlaceRepository;
import com.danit.finalproject.application.service.CrudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BusinessService implements CrudService<Business> {
  private BusinessRepository businessRepository;
  private PlaceRepository placeRepository;

  @Autowired
  public BusinessService(BusinessRepository businessRepository, PlaceRepository placeRepository) {
    this.businessRepository = businessRepository;
    this.placeRepository = placeRepository;
  }

  @Override
  public Business getById(Long id) {
    return businessRepository.findById(id).orElse(null);
  }

  @Override
  public List<Business> getAll() {
    return businessRepository.findAll();
  }

  public List<Business> findAllByPlace(Long placeId) {
    return businessRepository.findAllByPlace(placeRepository.findById(placeId).orElse(null));
  }

  @Override
  public Business create(Business business) {
    return businessRepository.save(business);
  }

  @Override
  public Business update(Long id, Business business) {
    business.setId(id);
    return businessRepository.saveAndFlush(business);
  }

  @Override
  public Business delete(Long id) {
    Business business = businessRepository.findById(id).orElse(null);
    businessRepository.deleteById(id);
    return business;
  }

  public Business addPhoto(BusinessPhoto businessPhoto, Long businessId) {
    Optional<Business> optionalBusiness = businessRepository.findById(businessId);
    optionalBusiness.ifPresent(business -> business.getPhotos().add(businessPhoto));
    Business business = optionalBusiness.orElse(null);
    businessRepository.save(business);
    return business;
  }
}

