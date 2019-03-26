package com.danit.finalproject.application.controller;

import com.danit.finalproject.application.dto.request.place.MenuItemRequest;
import com.danit.finalproject.application.dto.response.MenuItemResponse;
import com.danit.finalproject.application.facade.MenuItemFacade;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/menu-items")
public class MenuItemController {

  private MenuItemFacade menuItemFacade;

  @Autowired
  public MenuItemController(MenuItemFacade menuItemFacade) {
    this.menuItemFacade = menuItemFacade;
  }

  @GetMapping
  public List<MenuItemResponse> getAllMenuItems() {
    return menuItemFacade.getAll();
  }

  @PutMapping("/{id}")
  public MenuItemResponse updateMenuItem(@PathVariable("id") Long id,
      @RequestBody MenuItemRequest menuItemRequestDto) {
    return menuItemFacade.update(id, menuItemRequestDto);
  }

}